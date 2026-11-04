import prisma from '../database/prisma.js';
import GenericRepository from './generic.repository.js';

/**
 * @class PerfilRepository
 * @description Camada de acesso a dados para os perfis de utilizador (RBAC).
 */
class PerfilRepository extends GenericRepository {
    constructor() {
        super(prisma.perfil);
    }

    /**
     * Busca um perfil exato pelo seu nome (ex: 'ADMINISTRADOR').
     * Crucial para a atribuição de papéis no momento da criação de um utilizador.
     * @param {string} nome 
     * @returns {Promise<Object|null>}
     */
    async findByNome(nome) {
        return this.model.findUnique({
            where: { nome: nome }
            // Perfis base geralmente não sofrem soft-delete na modelagem de RBAC, 
            // mas mantemos a consistência herdada.
        });
    }
}

export default new PerfilRepository();