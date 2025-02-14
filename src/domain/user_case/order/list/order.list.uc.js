import { constants as httpConstants } from 'http2';
import { BaseUC } from '../../common/base.uc.js'

import { OrderListUCRequest } from "./order.list.uc.request.js";
import { OrderListUCResponse, OrderDishesListUCResponse } from "./order.list.uc.response.js";
import { OrderEntity, OrderItemEntity, OrderStatusEnum } from '../../../entity/order.entity.js';

export class OrderListUC extends BaseUC {
    async handler(request) {        
        if (!(request)) {
            return this.error('invalid parameters!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (!(request.customer_id)) {
            return this.error('invalid parameter customer_id!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }


        let entities =  await this.orderRepo.findByCustomer(request.customer_id, request.page??1, request.limit??10);

        let response = []        
        if (entities) {           
            for await (const order of entities) {
                let response_item = new OrderListUCResponse(order.id, [], null, order.status)
                let order_items_entities = await this.orderItemRepo.findByOrder(order.id);
                if (order_items_entities) { 
                    let total = 0.0;
                    for await (const order_item of order_items_entities) {
                        let menu_entity = await this.menuRepo.findOneById(order_item.menu_id);
                        let response_menu_item = new OrderDishesListUCResponse(menu_entity.id, menu_entity.name, menu_entity.category, order_item.quantity, menu_entity.price)
                        total = total + (order_item.quantity * menu_entity.price)
                        response_item.order_dishes.push(response_menu_item)
                    }
                    response_item.total_value = total;
                }
                response.push(response_item)
            }
        }
        return this.ok(response)        
    }
}