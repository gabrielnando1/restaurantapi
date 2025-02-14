import { IOrderItemRepository } from "../../../domain/interface/repository/i.order_item.repository.js";
import { OrderItemEntity } from "../../../domain/entity/order.entity.js";
import { BaseMockRepository } from "./base.mock.repository.js";

export default class OrderItemMockRepository extends BaseMockRepository  {

    db = [
        new OrderItemEntity(1, 1,  5, null),
        new OrderItemEntity(1, 2,  18, null),
        new OrderItemEntity(1, 3,  6, null),
        new OrderItemEntity(2, 1,  3, null),
        new OrderItemEntity(2, 3,  14, null),
        new OrderItemEntity(3, 2,  8, null),
        new OrderItemEntity(4, 2,  7, null),
        new OrderItemEntity(4, 3,  5, null),
        new OrderItemEntity(5, 1,  5, null),
        new OrderItemEntity(5, 2,  5, null),
        new OrderItemEntity(5, 3,  5, null),
        new OrderItemEntity(6, 1,  99, null),
        new OrderItemEntity(6, 2,  10, null),
        new OrderItemEntity(6, 3,  4, null),        
    ]

    constructor(){
        super();
        if (!this.implementsInterface(this, IOrderItemRepository)) {
            throw TypeError('Interface not implemented');
        }     
    }

    async add(order_item) {
        try {
            this.db.push(new OrderItemEntity(order_item.order_id, order_item.menu_id,  order_item.quantity, null))            
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }

    async findByOrder(order_id) { 
        try {
            if (this.db && this.db.length > 0) {
                return this.db.filter((element) => element.order_id == order_id);                
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }
    
    async findOneByOrderAndMenu (order_id, menu_id) { 
        try {
            if (this.db && this.db.length > 0) {
                return this.db.find((element) => element.order_id == order_id && element.menu_id == menu_id);
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }
    

    async bulkDelete(order_items) {
        try {
            if (order_items && order_items.length > 0) {
                for await (const item of order_items) {
                    this.db.splice(this.db.findIndex(element => element.order_id == item.order_id && element.menu_id == item.menu_id), 1);                    
                }
            }            
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }

    async bulkInsert(order_items) {
        try {
            if (order_items && order_items.length > 0) {
                for (const item of order_items) {
                    this.add(item);                    
                }
            }             
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }

    async bulkUpdate(order_items) {
        try {
            if (order_items && order_items.length > 0) {
                for (const item of order_items) {
                    let obj = this.db.find((element) => element => element.order_id == item.order_id && element.menu_id == item.menu_id);   
                    if(obj){
                        obj.quantity = item.quantity;
                    }
                }
            }             
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }
    
}