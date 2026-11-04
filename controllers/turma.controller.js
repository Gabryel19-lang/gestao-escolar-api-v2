import GenericController from './generic.controller.js';
import turmaRepository from '../repositories/turma.repository.js';

class TurmaController extends GenericController {
    constructor() {
        super(turmaRepository);
    }
}
export default new TurmaController();