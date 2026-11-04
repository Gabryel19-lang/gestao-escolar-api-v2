import prisma from '../database/prisma.js';
import GenericRepository from './generic.repository.js';

/**
 * @class TurmaRepository
 * @description Camada de acesso a dados específica para a entidade Turma.
 */
class TurmaRepository extends GenericRepository {
    constructor() {
        super(prisma.turma);
    }

    // Futuras queries complexas, como listar todas as turmas de um ano/semestre específico
    // com os dados do docente incluídos (JOIN), serão construídas aqui.
}

export default new TurmaRepository();