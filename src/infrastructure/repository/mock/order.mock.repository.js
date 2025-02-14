import { IOrderRepository } from "../../../domain/interface/repository/i.order.repository.js";
import { OrderEntity, OrderStatusEnum } from "../../../domain/entity/order.entity.js";
import { BaseMockRepository } from "./base.mock.repository.js";

export default class OrderMockRepository extends BaseMockRepository  {

    db = [
        new OrderEntity(1, 1, OrderStatusEnum.DELIVERED, null),
        new OrderEntity(2, 1, OrderStatusEnum.CANCELED, null),
        new OrderEntity(3, 1, OrderStatusEnum.PENDING, null),
        new OrderEntity(4, 2, OrderStatusEnum.PREPARING, null),
        new OrderEntity(5, 2, OrderStatusEnum.READY, null),
        new OrderEntity(6, 3, OrderStatusEnum.PENDING, null),             
    ]

    constructor(){
        super();
        if (!this.implementsInterface(this, IOrderRepository)) {
            throw TypeError('Interface not implemented');
        }     
    }

    #getAutoIncrementId() {
        if (this.db && this.db.length > 0) {
            return (Math.max(...this.db.map(o => o.id)) +1);
        } else {
            return 1;
        }
        
    }
    
    async add(order) {
        try {
            this.db.push(new OrderEntity(this.#getAutoIncrementId(), order.customer_id, order.status, null))            
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }    


    async updateStatus(id, status) {
        try {
            let obj = this.db.find((element) => element => element.id == id);   
            if(obj){
                obj.status = item.status;
            }    
            return obj;       
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }  


    async findByCustomer(customer_id, page = 1, limit = 10) {
        try {
            if (this.db && this.db.length > 0) {
                let filtered = undefined;
                if (customer_id) {
                    filtered = this.db.filter((element) => element.category == category);
                } else {
                    filtered = this.db;
                }                
                if (filtered && filtered.length > 0) {
                    let startIndex = (page - 1) * limit;
                    let endIndex = startIndex + limit;
                    return filtered.slice(startIndex, endIndex);
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }


    async findOneById(id) {
        try {
            if (this.db && this.db.length > 0) {
                return this.db.find((element) => element.id == id);
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }
    
}

export {OrderMockRepository}