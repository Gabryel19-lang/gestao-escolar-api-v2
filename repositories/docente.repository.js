import prisma from '../database/prisma.js';
import GenericRepository from './generic.repository.js';

/**
 * @class DocenteRepository
 * @description Camada de acesso a dados específica para a entidade Docente.
 */
class DocenteRepository extends GenericRepository {
    constructor() {
        super(prisma.docente);
    }

    /**
     * Recupera um docente pelo seu registro (identificador corporativo).
     * @param {string} registro 
     * @returns {Promise<Object|null>}
     */
    async findByRegistro(registro) {
        return this.model.findFirst({
            where: { 
                registro: registro,
                deletedAt: null 
            }
        });
    }
}

export default new DocenteRepository();