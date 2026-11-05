
import GenericController from './generic.controller.js';
import usuarioRepository from '../repositories/usuario.repository.js';
import perfilRepository from '../repositories/perfil.repository.js';
import * as argon2 from 'argon2';

class UsuarioController extends GenericController {
    constructor() {
        super(usuarioRepository);
        this.criar = this.criar.bind(this);
    }

    async criar(req, res) {
        try {
            const { email, senha } = req.body ?? {};

            // Validação dos dados
            if (
                typeof email !== 'string' ||
                typeof senha !== 'string' ||
                !email.trim() ||
                senha.length < 8
            ) {
                return res.status(400).json({
                    erro: 'Informe um email e uma senha com pelo menos 8 caracteres.'
                });
            }

            const emailNormalizado = email.trim().toLowerCase();

            // Verifica se o email já existe
            const existente = await this.repository.findByEmail(
                emailNormalizado
            );

            if (existente) {
                return res.status(409).json({
                    erro: 'Este email já está cadastrado.'
                });
            }

            // O servidor determina o perfil.
            // O cliente nunca escolhe ADMINISTRADOR.
            const perfilPadrao = 'USUARIO';

            let perfil = await perfilRepository.findByNome(
                perfilPadrao
            );

            // Cria o perfil comum se ele ainda não existir
            if (!perfil) {
                perfil = await perfilRepository.create({
                    nome: perfilPadrao,
                    descricao: 'Usuário comum do sistema'
                });
            }

            if (perfil.deletedAt) {
                return res.status(503).json({
                    erro: 'Perfil padrão indisponível.'
                });
            }

            // Protege a senha com Argon2
            const senhaHash = await argon2.hash(senha);

            // Cadastra no Neon utilizando Prisma
            const novoUsuario = await this.repository.create({
                email: emailNormalizado,
                senhaHash,
                perfilId: perfil.id
            });

            // Nunca devolve senhaHash
            return res.status(201).json({
                mensagem: 'Conta criada com sucesso!',
                usuario: {
                    id: novoUsuario.id,
                    email: novoUsuario.email,
                    perfil: perfilPadrao
                }
            });

        } catch (error) {
            console.error('[UsuarioController.criar]', error);

            if (error.code === 'P2002') {
                return res.status(409).json({
                    erro: 'Email ou perfil já cadastrado.'
                });
            }

            return res.status(500).json({
                erro: 'Erro interno ao cadastrar usuário.'
            });
        }
    }
}

export default new UsuarioController();
