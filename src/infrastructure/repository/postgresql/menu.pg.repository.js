import { QueryTypes, Model } from 'sequelize';
import { BasePgRepository, Classes, sequelize } from "./base.pg.repository.js";
import { IMenuRepository } from "../../../domain/interface/repository/i.menu.repository.js";
import { MenuEntity } from "../../../domain/entity/menu.entity.js";

import MenuModel from './models/menu.model.js';

export default class MenuPgRepository extends BasePgRepository  {

    constructor(){
        super();
        if (!this.implementsInterface(this, IMenuRepository)) {
            throw TypeError('Interface not implemented');
        }     
    }


    async findOneById(id) {
        try {
            const menu = await MenuModel.findOne({
                where: {
                    id: id
                },
            });

            if (menu) {
                return Object.assign(new MenuEntity(), menu.toJSON()) ;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }


    async findOneByNameAndCategory(name, category) { 
        try {
            const menu = await MenuModel.findOne({
                where: {
                    name: name,  
                    category: category,  
                },
            });

            if (menu) {
                return Object.assign(new MenuEntity(), menu.toJSON()) ;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }

    async findByCategory(category, page = 1, limit = 10) {
        const where = {};
        
        if (category) {
            where.category = category;
        }

        try {
            const menus = await MenuModel.findAll({
                where: where,
                limit: limit,   
                offset: page -1,
            });

            if (menus) {                
                return menus.map(menu => (Object.assign(new MenuEntity(), menu.toJSON()) ));
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }

    }

    async add(menu) { 
        try {
            const newMenu = await MenuModel.create({
                name: menu.name,
                description: menu.description,
                category: menu.category,
                price: menu.price
            });    
            menu = Object.assign(new MenuEntity(), newMenu.toJSON())    
            return menu
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }
    
}