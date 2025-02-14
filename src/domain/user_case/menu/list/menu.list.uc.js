import { constants as httpConstants } from 'http2';
import { BaseUC } from '../../common/base.uc.js'

import { MenuListUCRequest } from "./menu.list.uc.request.js";
import { MenuListUCResponse } from "./menu.list.uc.response.js";
import { MenuEntity, CategoryEnum } from '../../../entity/menu.entity.js';

export class MenuListUC extends BaseUC {
    async handler(request) {        
        if (!(request)) {
            return this.error('invalid parameters!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (request.category) {
            let  entity = new MenuEntity(null, null, null, null, request.category)
            if (!(entity.isValidCategory())) {
                return this.error(`invalid category! Enabled categories: ${Object.values(CategoryEnum).join(', ')}`,httpConstants.HTTP_STATUS_BAD_REQUEST)
            }            
        }

        let entities =  await this.menuRepo.findByCategory(request.category, request.page??1, request.limit??10);

        let response = []
        if (entities) {                
            response = entities.map(menu => (new MenuListUCResponse(
                menu.id,                
                menu.name,
                menu.description,
                menu.price,
                menu.category
            )));
        } 

        return this.ok(response)        
    }
}