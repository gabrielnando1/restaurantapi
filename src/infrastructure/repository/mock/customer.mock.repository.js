import { ICustomerRepository } from "../../../domain/interface/repository/i.customer.repository.js";
import { CustomerEntity } from "../../../domain/entity/customer.entity.js";
import { BaseMockRepository } from "./base.mock.repository.js";

export default class CustomerMockRepository extends BaseMockRepository  {
    db = [
        new CustomerEntity(1, 'Customer One', 'one@customer.com', '1111-1111'),
        new CustomerEntity(2, 'Customer Two', 'two@customer.com', '2222-2222'),
        new CustomerEntity(3, 'Customer Three', 'three@customer.com', '3333-3333'),
    ]

    constructor(){
        super();
        if (!this.implementsInterface(this, ICustomerRepository)) {
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

    async registration(customer) {
        try {
            this.db.push(new CustomerEntity(this.#getAutoIncrementId(), customer.name, customer.email, customer.phone))            
        } catch (error) {
            throw new Error("Database error!");                        
        }
    }

    
    async getByEmail(email) {
        try {
            if (this.db && this.db.length > 0) {
                return this.db.find((element) => element.email == email);
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