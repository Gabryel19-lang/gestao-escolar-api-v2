import GenericController from './generic.controller.js';
import permissaoRepository from '../repositories/permissao.repository.js';

/**
 * @class PermissaoController
 * @description Gestão de permissões do sistema.
 */
class PermissaoController extends GenericController {
    constructor() {
        super(permissaoRepository);
    }
}
export default new PermissaoController();