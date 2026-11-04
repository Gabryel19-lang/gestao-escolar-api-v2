import usuarioRepository from '../repositories/usuario.repository.js';
import * as argon2 from 'argon2';
import { SignJWT } from 'jose';

// Inicializamos o segredo em formato Uint8Array como exigido pela biblioteca 'jose'
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * @class AuthController
 * @description Orquestra a autenticação e emissão de tokens JWT.
 */
class AuthController {
    /**
     * Valida credenciais e devolve o Token JWT.
     */
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ erro: "Email e senha são obrigatórios." });
            }

            // 1. Busca o utilizador (o repositório já traz a tabela 'Perfil' via JOIN)
            const usuario = await usuarioRepository.findByEmail(email);

            // Evitamos dar dicas a atacantes se o erro foi no e-mail ou na senha
            if (!usuario) {
                return res.status(401).json({ erro: "Credenciais inválidas." });
            }

            // 2. Verificação de Tempo Constante (Argon2)
            const senhaValida = await argon2.verify(usuario.senhaHash, senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: "Credenciais inválidas." });
            }

            // 3. Construção do Payload do JWT
            const payload = { 
                id: usuario.id, 
                email: usuario.email,
                perfil: usuario.perfil.nome // Crucial para futuras autorizações (RBAC)
            };

            // 4. Assinatura do Token com a biblioteca 'jose'
            const token = await new SignJWT(payload)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('2h') // Expiração curta por segurança
                .setSubject(usuario.id.toString())
                .setIssuer('gestao-escolar-api')
                .sign(SECRET);

            return res.status(200).json({ 
                mensagem: "Autenticação bem-sucedida",
                token, 
                usuario: payload 
            });

        } catch (error) {
            console.error("[AuthController.login] Erro:", error);
            return res.status(500).json({ erro: "Falha interna durante a autenticação." });
        }
    }
}

export default new AuthController();