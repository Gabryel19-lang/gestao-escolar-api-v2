import GenericController from './generic.controller.js';
import cursoRepository from '../repositories/curso.repository.js';

class CursoController extends GenericController {
    constructor() {
        super(cursoRepository);
    }
}
export default new CursoController();