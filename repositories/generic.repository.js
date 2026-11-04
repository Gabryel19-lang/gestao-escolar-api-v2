import prisma from '../database/prisma.js';

/**
 * @class GenericRepository
 * @description Classe base arquitetural que implementa o padrão Repository.
 * Encapsula as operações de base de dados, protegendo os controladores da sintaxe do ORM
 * e garantindo a aplicação automática do mecanismo de Soft Delete (Eliminação Lógica).
 */
export default class GenericRepository {
    /**
     * @param {Object} modelDelegate - O delegate do modelo do Prisma (ex: prisma.aluno)
     */
    constructor(modelDelegate) {
        if (!modelDelegate) {
            throw new Error("[Arquitetura] Um delegate do Prisma deve ser fornecido ao inicializar o repositório.");
        }
        this.model = modelDelegate;
    }

    /**
     * Recupera todos os registos ativos.
     * @param {Object} [options={}] - Opções adicionais do Prisma (where, include, select, orderBy)
     * @returns {Promise<Array>} Lista de registos encontrados.
     */
    async findAll(options = {}) {
        const defaultWhere = { deletedAt: null };
        
        // Mescla filtros personalizados enviados pelo Controlador com a trava do Soft Delete
        const mergedWhere = options.where ? { ...options.where, ...defaultWhere } : defaultWhere;
        
        return this.model.findMany({
            ...options,
            where: mergedWhere,
        });
    }

    /**
     * Recupera um único registo ativo por ID.
     * @param {number|string} id - Identificador único do registo.
     * @param {Object} [options={}] - Opções adicionais (include, select)
     * @returns {Promise<Object|null>} O registo encontrado ou null.
     */
    async findById(id, options = {}) {
        return this.model.findFirst({
            ...options,
            where: {
                id: Number(id),
                deletedAt: null,
                ...(options.where || {})
            },
        });
    }

    /**
     * Cria um novo registo na base de dados.
     * @param {Object} data - Objeto contendo os dados a serem persistidos (DTO).
     * @returns {Promise<Object>} O registo criado.
     */
    async create(data) {
        return this.model.create({
            data,
        });
    }

    /**
     * Atualiza um registo existente, garantindo que não esteja logicamente eliminado.
     * @param {number|string} id - Identificador único do registo.
     * @param {Object} data - Objeto contendo os campos a serem atualizados.
     * @returns {Promise<Object>} O registo atualizado.
     */
    async update(id, data) {
        // Validação defensiva: impede a atualização de "lixo lógico"
        const exists = await this.findById(id);
        if (!exists) {
            throw new Error("Registo não encontrado ou já eliminado logicamente.");
        }

        return this.model.update({
            where: { id: Number(id) },
            data,
        });
    }

    /**
     * Executa a eliminação lógica (Soft Delete) de um registo.
     * @param {number|string} id - Identificador único do registo.
     * @returns {Promise<Object>} O registo inativado.
     */
    async delete(id) {
        // Validação defensiva antes de eliminar
        const exists = await this.findById(id);
        if (!exists) {
            throw new Error("Registo não encontrado ou já eliminado logicamente.");
        }

        return this.model.update({
            where: { id: Number(id) },
            data: { deletedAt: new Date() },
        });
    }

    /**
     * Restaura um registo previamente eliminado de forma lógica.
     * @param {number|string} id - Identificador único do registo.
     * @returns {Promise<Object>} O registo restaurado.
     */
    async restore(id) {
        return this.model.update({
            where: { id: Number(id) },
            data: { deletedAt: null },
        });
    }
}