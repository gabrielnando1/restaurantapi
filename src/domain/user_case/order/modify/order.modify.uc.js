import { constants as httpConstants } from 'http2';
import { BaseUC } from '../../common/base.uc.js'

import { OrderModifyUCRequest } from "./order.modify.uc.request.js";
import { OrderModifyUCResponse, OrderModifyItemUCResponse } from "./order.modify.uc.response.js";
import { OrderEntity, OrderItemEntity, OrderStatusEnum } from '../../../entity/order.entity.js';

export class OrderModifyUC extends BaseUC {
    async handler(request) {        
        if (!(request)) {
            return this.error('invalid parameters!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (!(request.order_id)) {
            return this.error('invalid parameter order_id!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (!(request.items) || (request.items.length <= 0)) {        
            return this.error('invalid parameter items!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        request.items.forEach((item) => {
            if (!(item.quantity) || item.quantity <= 0){
                return this.error('invalid item quantity!',httpConstants.HTTP_STATUS_BAD_REQUEST);                
            }
        });

        let order = await this.orderRepo.findOneById(request.order_id);  
        if (!(order) || !(order.id)) {
            return this.error('invalid order_id!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (order.status != OrderStatusEnum.PENDING && order.status != OrderStatusEnum.PREPARING) {
            return this.error('order status need be pending or preparing!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }
        
        order.items = await this.orderItemRepo.findByOrder(request.order_id); 
        let order_item_create = [] 
        let order_item_update = [] 
        let order_item_delete = [] 
        if (order.items && order.items.length > 0) {
            for await (const order_item of order.items) {
                let item = request.items.find((element) => element.menu_item_id == order_item.menu_id);
                if (!(item)) {
                    order_item_delete.push(new OrderItemEntity(request.order_id, order_item.menu_id, order_item.quantity))
                }
            }
        }

        for await (const item of request.items) {
            if (order.items && order.items.length > 0) {
                let order_item = order.items.find((element) => element.menu_id == item.menu_item_id);
                if(order_item) {
                    if (order_item.quantity != item.quantity) {
                        order_item.quantity = item.quantity;
                        order_item_update.push(order_item)
                    }                    
                    continue;
                }
            }            
            let menu = await this.menuRepo.findOneById(item.menu_item_id);            
            if (!(menu)){
                return this.error('invalid menu!',httpConstants.HTTP_STATUS_BAD_REQUEST);                
            }
            let order_item = new OrderItemEntity(request.order_id, menu.id, item.quantity)
            if (!(order.items)) {
                order.items = [];
            }
            //order.items.push(order_item)
            order_item_create.push(order_item)            
        }

        if (order_item_delete && order_item_delete.length > 0) {
            await this.orderItemRepo.bulkDelete(order_item_delete);
        }
        if (order_item_create && order_item_create.length > 0) {
            await this.orderItemRepo.bulkInsert(order_item_create);
        }
        if (order_item_update && order_item_update.length > 0) {
            await this.orderItemRepo.bulkUpdate(order_item_update);
        }
                        

        let reponse = new OrderModifyUCResponse(request.order_id, request.items.map(item => (new OrderModifyItemUCResponse(
            item.menu_item_id,        
            item.quantity
        ))))
        return this.ok(reponse)        
    }
}