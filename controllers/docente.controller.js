import GenericController from './generic.controller.js';
import docenteRepository from '../repositories/docente.repository.js';

class DocenteController extends GenericController {
    constructor() {
        super(docenteRepository);
    }
}
export default new DocenteController();