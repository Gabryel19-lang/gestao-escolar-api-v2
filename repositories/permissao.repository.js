import prisma from '../database/prisma.js';
import GenericRepository from './generic.repository.js';

/**
 * @class PermissaoRepository
 * @description Camada de acesso a dados para as permissões granulares do sistema.
 */
class PermissaoRepository extends GenericRepository {
    constructor() {
        super(prisma.permissao);
    }
}

export default new PermissaoRepository();