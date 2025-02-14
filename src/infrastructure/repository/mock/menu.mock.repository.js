import { IMenuRepository } from "../../../domain/interface/repository/i.menu.repository.js";
import { MenuEntity, CategoryEnum } from "../../../domain/entity/menu.entity.js";
import { BaseMockRepository } from "./base.mock.repository.js";

export default class MenuMockRepository extends BaseMockRepository  {

    db = [
        new MenuEntity(1, 'Menu One', 'Menu One', 5, CategoryEnum.STARTER),
        new MenuEntity(2, 'Menu Two', 'Menu Two', 10, CategoryEnum.DRINK),
        new MenuEntity(3, 'Menu Three', 'Menu Three', 15, CategoryEnum.MAIN_COURSE),
    ]

    constructor(){
        super();
        if (!this.implementsInterface(this, IMenuRepository)) {
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


    async findOneByNameAndCategory(name, category) { 
        try {
            if (this.db && this.db.length > 0) {
                return this.db.find((element) => element.name == name && element.category == category);
            } else {
                return null;
            }
        } catch (error) {
            throw new Error("Database error!"); 
        }
    }

    async findByCategory(category, page = 1, limit = 10) {
        try {
            if (this.db && this.db.length > 0) {
                let filtered = this.db.filter((element) => element.category == category);
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

    async add(menu) { 
        try {
            this.db.push(new MenuEntity(this.#getAutoIncrementId(), menu.name, menu.description, menu.price, menu.category))            
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }
    
}