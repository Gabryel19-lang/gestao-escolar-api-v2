import GenericController from './generic.controller.js';
import perfilRepository from '../repositories/perfil.repository.js';

/**
 * @class PerfilController
 * @description Gestão de níveis de acesso (Perfis/Roles).
 */
class PerfilController extends GenericController {
    constructor() {
        super(perfilRepository);
    }
}
export default new PerfilController();