import prisma from '../database/prisma.js';
import GenericRepository from './generic.repository.js';

/**
 * @class UsuarioRepository
 * @description Camada de acesso a dados específica para a entidade Usuario.
 * Essencial para o sistema de Autenticação (Sign-in) e Controle de Acesso (RBAC).
 */
class UsuarioRepository extends GenericRepository {
    constructor() {
        // Injeta o delegate 'usuario' do Prisma na superclasse
        super(prisma.usuario);
    }

    /**
     * Busca um usuário ativo pelo seu endereço de e-mail.
     * @param {string} email - E-mail do usuário.
     * @returns {Promise<Object|null>} O usuário com os dados do Perfil associado.
     */
    async findByEmail(email) {
        return this.model.findFirst({
            where: { 
                email: email,
                deletedAt: null // Garantia arquitetural: nunca autenticar usuários deletados
            },
            include: {
                // Realiza o JOIN automático para trazer o perfil (ex: 'ADMINISTRADOR')
                // Isso será vital para embutirmos a Role no payload do token JWT
                perfil: true 
            }
        });
    }
}

// Exportamos o Singleton stateless
export default new UsuarioRepository();