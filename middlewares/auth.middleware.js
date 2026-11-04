import { jwtVerify } from 'jose';

// Inicializamos o segredo no formato exigido pela especificação JWT moderna
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Middleware rigoroso para validação de Tokens JWT.
 * Interceta a requisição HTTP, valida a assinatura criptográfica e a expiração.
 */
export const verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Validação Fail-Fast: Se não há cabeçalho ou formato não é Bearer, rejeita imediatamente
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                erro: "Acesso negado. Token de autenticação ausente ou mal formatado." 
            });
        }

        // Extração do token (Padrão: 'Bearer eyJhbGciOiJIUzI1...')
        const token = authHeader.split(' ')[1];

        // Verificação criptográfica de alta performance
        const { payload } = await jwtVerify(token, SECRET);

        // Injeção do contexto do utilizador na requisição para uso nos Controladores
        req.usuario = payload;

        // Permite que a requisição prossiga para o próximo Middleware ou Controlador
        next();

    } catch (error) {
        // Se a assinatura for inválida ou o token tiver expirado, a jose lança uma exceção
        console.error("[Middleware.verificarToken] Falha de segurança:", error.code);
        return res.status(401).json({ 
            erro: "Sessão inválida ou expirada. Efetue um novo login." 
        });
    }
};