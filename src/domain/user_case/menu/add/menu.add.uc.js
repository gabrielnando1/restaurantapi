import { constants as httpConstants } from 'http2';
import { BaseUC } from '../../common/base.uc.js'

import { MenuAddUCRequest } from "./menu.add.uc.request.js";
import { MenuAddUCResponse } from "./menu.add.uc.response.js";
import { MenuEntity, CategoryEnum } from '../../../entity/menu.entity.js';

export class MenuAddUC extends BaseUC {
    async handler(request) {        
        if (!(request)) {
            return this.error('invalid parameters!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        let  entity = new MenuEntity(null, request.name, request.description, request.price, request.category) 

        if (!(entity.isValidName())) {
            return this.error('invalid name!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (!(entity.isValidDescription())) {
            return this.error('invalid description!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (!(entity.isValidPrice())) {
            return this.error('invalid price!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (!(entity.isValidCategory())) {
            return this.error(`invalid category! Enabled categories: ${Object.values(CategoryEnum).join(', ')}`,httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        let menu = await this.menuRepo.findOneByNameAndCategory(request.name, request.category);
        if (menu && menu.id > 0) {
            return this.error('menu already exists!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }                   
        menu = await this.menuRepo.add(entity);
        return this.ok(new MenuAddUCResponse(menu.id, menu.name, menu.description, menu.price, menu.category))        
    }
}