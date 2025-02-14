import { constants as httpConstants } from 'http2';
import { BaseUC } from '../../common/base.uc.js'

import { OrderStatusUCRequest } from "./order.status.uc.request.js";
import { OrderStatusUCResponse } from "./order.status.uc.response.js";
import { OrderEntity, OrderStatusEnum } from '../../../entity/order.entity.js';

export class OrderStatusUC extends BaseUC {
    async handler(request) {        
        if (!(request)) {
            return this.error('invalid parameters!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (!(request.order_id)) {
            return this.error('invalid parameter order_id!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        if (!(request.status)) {
            return this.error('invalid parameter status!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        let  entity = new OrderEntity(request.order_id, null, request.status, null) 
        if (!(entity.isValidStatus())) {
            return this.error(`invalid status! Enabled status: ${Object.values(OrderStatusEnum).join(', ')}`,httpConstants.HTTP_STATUS_BAD_REQUEST);            
        }

        let rows = await this.orderRepo.updateStatus(request.order_id, request.status)
        return this.ok(new OrderStatusUCResponse(request.order_id, request.status))        
    }
}