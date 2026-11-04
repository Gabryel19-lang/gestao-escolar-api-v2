import prisma from '../database/prisma.js';
import GenericRepository from './generic.repository.js';

/**
 * @class AlunoRepository
 * @description Camada de acesso a dados específica para a entidade Aluno.
 * Herda operações de CRUD e Eliminação Lógica (Soft Delete) do GenericRepository.
 */
class AlunoRepository extends GenericRepository {
    constructor() {
        // Injeta o delegate 'aluno' do Prisma na superclasse
        super(prisma.aluno);
    }

    /**
     * Recupera um aluno específico através da sua matrícula.
     * @param {string} matricula - A matrícula única do aluno (ex: '2026-001').
     * @returns {Promise<Object|null>} O registo do aluno encontrado ou null.
     */
    async findByMatricula(matricula) {
        // Utilizamos o findFirst em vez de findUnique para permitir a injeção 
        // da regra de Soft Delete (deletedAt: null), garantindo consistência.
        return this.model.findFirst({
            where: { 
                matricula: matricula,
                deletedAt: null 
            }
        });
    }

    /* 
     * Nota Arquitetural: 
     * Futuras queries complexas, transações (prisma.$transaction) e agregações 
     * relacionadas exclusivamente com Alunos deverão ser implementadas aqui.
     */
}

// Exportamos uma única instância (Singleton) para toda a aplicação.
// Repositórios não guardam estado transacional na classe (são stateless).
export default new AlunoRepository();