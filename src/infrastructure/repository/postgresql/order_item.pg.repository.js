import { QueryTypes, Model } from 'sequelize';
import { BasePgRepository, Classes, sequelize } from "./base.pg.repository.js";
import { IOrderItemRepository } from "../../../domain/interface/repository/i.order_item.repository.js";
import { OrderItemEntity } from "../../../domain/entity/order.entity.js";

import OrderItemModel from './models/order_item.model.js';

export default class OrderItemPgRepository extends BasePgRepository  {

    constructor(){
        super();
        if (!this.implementsInterface(this, IOrderItemRepository)) {
            throw TypeError('Interface not implemented');
        }     
    }


    async add(order_item) {
        try {
            const newOrderItem = await OrderItemModel.create({
                order_id: order_item.order_id,
                menu_id: order_item.menu_id,
                quantity: order_item.quantity,                
            });    
            order_item = Object.assign(new OrderItemEntity(), newOrderItem.toJSON())    
            return order_item
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }

    async findByOrder(order_id) { 
        try {
            const order_items = await OrderItemModel.findAll({
                where: {
                    order_id: order_id                     
                },
            });

            if (order_items) {                
                return order_items.map(menu => (Object.assign(new OrderItemEntity(), menu.toJSON()) ));
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }
    
    async findOneByOrderAndMenu (order_id, menu_id) { 
        try {
            const order_item = await OrderItemModel.findOne({
                where: {
                    order_id: order_id,  
                    menu_id: menu_id,  
                },
            });

            if (order_item) {
                return Object.assign(new OrderItemEntity(), order_item.toJSON()) ;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }
    

    async bulkDelete(order_items) {
        try {
            const queries = order_items.map(item => 
                `DELETE FROM public.order_item WHERE order_id = ${item.order_id} and menu_id = ${item.menu_id};`
            );
        
            await sequelize.query(queries.join(' '));            
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }

    async bulkInsert(order_items) {
        try {
            const queries = order_items.map(item => 
                `INSERT INTO public.order_item(order_id, menu_id, "createdAt", "updatedAt", quantity) VALUES (${item.order_id}, ${item.menu_id}, NOW(), NOW(), ${item.quantity});`
            );        
            await sequelize.query(queries.join(' '));            
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }

    async bulkUpdate(order_items) {
        try {
            const queries = order_items.map(item => 
                `UPDATE public.order_item SET  "updatedAt"=NOW(), quantity=${item.quantity} WHERE order_id=${item.order_id} and menu_id=${item.menu_id};`
            );        
            await sequelize.query(queries.join(' '));            
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }
    
}