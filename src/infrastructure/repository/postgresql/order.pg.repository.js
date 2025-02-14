import { QueryTypes, Model } from 'sequelize';
import { BasePgRepository, Classes, sequelize } from "./base.pg.repository.js";
import { IOrderRepository } from "../../../domain/interface/repository/i.order.repository.js";
import { OrderEntity } from "../../../domain/entity/order.entity.js";

import OrderModel from './models/order.model.js';

export default class OrderPgRepository extends BasePgRepository  {

    constructor(){
        super();
        if (!this.implementsInterface(this, IOrderRepository)) {
            throw TypeError('Interface not implemented');
        }     
    }
    
    async add(order) {
        try {
            const newOrder = await OrderModel.create({
                customer_id: order.customer_id,
                status: order.status             
            });    
            order = Object.assign(new OrderEntity(), newOrder.toJSON())    
            return order
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }    


    async updateStatus(id, status) {
        try {
            const [updatedRows] = await OrderModel.update({                
                status: status           
            }, {
                where: { id }
            });                 
            return updatedRows;
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }  


    async findByCustomer(customer_id, page = 1, limit = 10) {
        const where = {};
        
        if (customer_id) {
            where.customer_id = customer_id;
        }

        try {
            const orders = await OrderModel.findAll({
                where: where,
                limit: limit,   
                offset: page -1,
            });

            if (orders) {                
                return orders.map(order => (Object.assign(new OrderEntity(), order.toJSON()) ));
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }

    }


    async findOneById(id) {
        try {
            const order = await OrderModel.findOne({
                where: {
                    id: id
                },
            });

            if (order) {
                return Object.assign(new OrderEntity(), order.toJSON()) ;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }
    
}