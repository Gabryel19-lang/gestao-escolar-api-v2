/**
 * @class GenericController
 * @description Superclasse que implementa as rotas padrão RESTful (CRUD).
 * Evita repetição de código (DRY) nos controladores de domínio.
 */
export default class GenericController {
    constructor(repository) {
        if (!repository) {
            throw new Error("[Arquitetura] Um repositório deve ser injetado no GenericController.");
        }
        this.repository = repository;

        // O Express perde o contexto do 'this' ao invocar o método na rota.
        // O .bind(this) garante que a classe saiba quem ela é em tempo de execução.
        this.listar = this.listar.bind(this);
        this.obterPorId = this.obterPorId.bind(this);
        this.criar = this.criar.bind(this);
        this.atualizar = this.atualizar.bind(this);
        this.remover = this.remover.bind(this);
    }

    async listar(req, res) {
        try {
            const dados = await this.repository.findAll();
            return res.status(200).json(dados);
        } catch (error) {
            console.error(`[${this.constructor.name}.listar] Erro:`, error);
            return res.status(500).json({ erro: "Falha interna ao listar registros." });
        }
    }

    async obterPorId(req, res) {
        try {
            const { id } = req.params;
            const registro = await this.repository.findById(id);
            
            if (!registro) {
                return res.status(404).json({ erro: "Registro não encontrado ou desativado." });
            }
            return res.status(200).json(registro);
        } catch (error) {
            console.error(`[${this.constructor.name}.obterPorId] Erro:`, error);
            return res.status(500).json({ erro: "Falha interna ao buscar o registro." });
        }
    }

    async criar(req, res) {
        try {
            const novoRegistro = await this.repository.create(req.body);
            return res.status(201).json(novoRegistro);
        } catch (error) {
            console.error(`[${this.constructor.name}.criar] Erro:`, error);
            return res.status(400).json({ erro: "Falha ao criar registro. Verifique os dados enviados." });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const registroAtualizado = await this.repository.update(id, req.body);
            return res.status(200).json(registroAtualizado);
        } catch (error) {
            console.error(`[${this.constructor.name}.atualizar] Erro:`, error);
            return res.status(400).json({ erro: error.message || "Falha ao atualizar o registro." });
        }
    }

    async remover(req, res) {
        try {
            const { id } = req.params;
            // Executa o Soft Delete provido pelo GenericRepository
            await this.repository.delete(id);
            // 204 No Content é o padrão RESTful para exclusões bem-sucedidas
            return res.status(204).send();
        } catch (error) {
            console.error(`[${this.constructor.name}.remover] Erro:`, error);
            return res.status(400).json({ erro: error.message || "Falha ao remover o registro." });
        }
    }
}