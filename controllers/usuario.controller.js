import GenericController from './generic.controller.js';
import usuarioRepository from '../repositories/usuario.repository.js';
import perfilRepository from '../repositories/perfil.repository.js';
import * as argon2 from 'argon2';

/**
 * @class UsuarioController
 * @description Controlador de Usuários. Herda o CRUD básico, 
 * mas aplica segurança rigorosa no momento da criação.
 */
class UsuarioController extends GenericController {
    constructor() {
        super(usuarioRepository);
        // Bind obrigatório para o método sobrescrito
        this.criar = this.criar.bind(this);
    }

    /**
     * Sobrescrita (Override) do método genérico.
     */
    async criar(req, res) {
        try {
            const { email, senha, perfilNome } = req.body;

            if (!email || !senha || !perfilNome) {
                return res.status(400).json({ 
                    erro: "Os campos email, senha e perfilNome são obrigatórios." 
                });
            }

            const usuarioExistente = await this.repository.findByEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({ erro: "Este e-mail já está em uso." });
            }

            const nomeNormalizado = perfilNome.toUpperCase();
            let perfil = await perfilRepository.findByNome(nomeNormalizado);
            
            if (!perfil) {
                perfil = await perfilRepository.create({ nome: nomeNormalizado });
            }

            const senhaHash = await argon2.hash(senha);

            const novoUsuario = await this.repository.create({
                email,
                senhaHash,
                perfilId: perfil.id
            });

            delete novoUsuario.senhaHash;
            return res.status(201).json(novoUsuario);

        } catch (error) {
            console.error("[UsuarioController.criar] Erro:", error);
            return res.status(500).json({ erro: "Falha interna ao registar utilizador." });
        }
    }
    
    // Os métodos listar, obterPorId, atualizar e remover são herdados automaticamente!
}

export default new UsuarioController();