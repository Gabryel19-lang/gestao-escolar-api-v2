import prisma from '../database/prisma.js';
import GenericRepository from './generic.repository.js';

/**
 * @class CursoRepository
 * @description Camada de acesso a dados específica para a entidade Curso.
 */
class CursoRepository extends GenericRepository {
    constructor() {
        super(prisma.curso);
    }
    
    // O CRUD genérico já suporta listagem e criação.
    // Lógicas de agregação (ex: carga horária total das disciplinas) residirão aqui.
}

export default new CursoRepository();