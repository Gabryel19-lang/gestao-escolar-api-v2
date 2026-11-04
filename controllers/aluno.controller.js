import GenericController from './generic.controller.js';
import alunoRepository from '../repositories/aluno.repository.js';

/**
 * @class AlunoController
 * @description Controlador específico para Alunos. Herda o CRUD básico, 
 * mas aplica regras de negócio exclusivas do domínio escolar.
 */
class AlunoController extends GenericController {
    constructor() {
        // Injeta o repositório específico na superclasse
        super(alunoRepository);
        
        // Bind obrigatório pois estamos sobrescrevendo o método da classe pai
        this.criar = this.criar.bind(this);
    }

    /**
     * Sobrescrita (Override) do método criar genérico.
     * Motivo: Alunos possuem a regra de negócio de unicidade de matrícula e formatação de data.
     */
    async criar(req, res) {
        try {
            const { matricula, nome, dataNascimento } = req.body;
            
            if (!matricula || !nome || !dataNascimento) {
                return res.status(400).json({ 
                    erro: "Os campos matrícula, nome e dataNascimento são obrigatórios." 
                });
            }

            const alunoExistente = await this.repository.findByMatricula(matricula);
            if (alunoExistente) {
                return res.status(409).json({ erro: "Esta matrícula já encontra-se cadastrada." });
            }

            const novoAluno = await this.repository.create({
                matricula,
                nome,
                dataNascimento: new Date(dataNascimento) 
            });

            return res.status(201).json(novoAluno);
        } catch (error) {
            console.error("[AlunoController.criar] Erro:", error);
            return res.status(500).json({ erro: "Falha interna ao processar o cadastro." });
        }
    }

    // Os métodos listar, obterPorId, atualizar e remover já estão implícitos!
}

export default new AlunoController();