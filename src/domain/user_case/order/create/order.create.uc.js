import { constants as httpConstants } from 'http2';
import { BaseUC } from '../../common/base.uc.js'

import { OrderCreateUCRequest } from "./order.create.uc.request.js";
import { OrderCreateUCResponse, OrderCreateItemUCResponse } from "./order.create.uc.response.js";
import { OrderEntity, OrderItemEntity, OrderStatusEnum } from '../../../entity/order.entity.js';

export class OrderCreateUC extends BaseUC {
    async handler(request) {        
        if (!(request)) {
            return this.error('invalid parameters!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (!(request.items)) {
            return this.error('invalid parameter items!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        let  entity = new OrderEntity(null, request.customer_id, OrderStatusEnum.PENDING, null) 
        entity.items = request.items.map(item => (new OrderItemEntity(
            null, 
            item.menu_item_id, 
            item.quantity
        )));

        if (!(entity.isValidItems())) {
            return this.error('invalid items!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }


        if (!(entity.isValidCustomerId())) {
            return this.error('invalid customer!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        let customer = await this.customerRepo.findOneById(entity.customer_id);
        if(!(customer) || !(customer.id)) {
            return this.error('invalid customer!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        entity.items.forEach((item) => {
            if (!(item.isValidItem())){
                return this.error('invalid items!',httpConstants.HTTP_STATUS_BAD_REQUEST);                
            }
        });

        for await (const item of entity.items) {
            let menu = await this.menuRepo.findOneById(item.menu_id);            
            if (!(menu)){
                return this.error('invalid menu!',httpConstants.HTTP_STATUS_BAD_REQUEST);                
            }
            item.menu = menu;
        }

        let order = await this.orderRepo.add(entity); 
        for await (const item of entity.items) {
            item.order_id = order.id;
            await this.orderItemRepo.add(item);
        }                    
        let response = new OrderCreateUCResponse(order.id, order.customer_id, entity.items.map(item => (new OrderCreateItemUCResponse(
            item.menu_id,    
            item.menu.name,
            item.menu.category,
            item.quantity
        ))));
        return this.ok(response)        
    }
}