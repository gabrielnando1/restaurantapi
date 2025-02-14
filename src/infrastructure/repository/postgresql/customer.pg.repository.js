import { QueryTypes, Model } from 'sequelize';
import { BasePgRepository, Classes, sequelize } from "./base.pg.repository.js";
import { ICustomerRepository } from "../../../domain/interface/repository/i.customer.repository.js";
import { CustomerEntity } from "../../../domain/entity/customer.entity.js";

import CustomerModel from './models/customer.model.js';

export default class CustomerPgRepository extends BasePgRepository  {

    constructor(){
        super();
        if (!this.implementsInterface(this, ICustomerRepository)) {
            throw TypeError('Interface not implemented');
        }     
    }
    

    async registration(customer) {
        try {
            const newCustomer = await CustomerModel.create({
                name: customer.name,
                email: customer.email,
                phone: customer.phone
            });    
            customer = Object.assign(new CustomerEntity(), newCustomer.toJSON())    
            return customer
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }

    
    async getByEmail(email) {
        try {
            const customer = await CustomerModel.findOne({
                where: {
                    email: email,  
                },
            });

            if (customer) {
                return Object.assign(new CustomerEntity(), customer.toJSON()) ;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }


    async findOneById(id) { 
        try {
            const customer = await CustomerModel.findOne({
                where: {
                    id: id,  
                },
            });

            if (customer) {
                return Object.assign(new CustomerEntity(), customer.toJSON()) ;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }
}