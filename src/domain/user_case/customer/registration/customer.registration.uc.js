import { constants as httpConstants } from 'http2';
import { CustomerEntity } from '../../../entity/customer.entity.js';
import { BaseUC } from '../../common/base.uc.js'

import { CustomerRegistrationUCRequest } from "./customer.registration.uc.request.js";
import { CustomerRegistrationUCResponse } from "./customer.registration.uc.response.js";

export class CustomerRegistrationUC extends BaseUC {
    async handler(request) {        
        if (!(request)) {
            return this.error('invalid parameters!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }
        if (!(request.email) || !(request.email.trim())) {
            return this.error('invalid parameters!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }
        if (!(request.name) || !(request.name.trim())) {
            return this.error('invalid name!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        let customer = await this.customerRepo.getByEmail(request.email);
        if (customer && customer.id > 0) {
            return this.error('email already exists!',httpConstants.HTTP_STATUS_BAD_REQUEST)
        }

        let  entity = new CustomerEntity(null, request.name, request.email, request.phone) 
        if (!entity.isValidName()) {
            return this.error('invalid name!',httpConstants.HTTP_STATUS_BAD_REQUEST)            
        } 
        if (!entity.isValidEMail()) {
            return this.error('invalid email!',httpConstants.HTTP_STATUS_BAD_REQUEST)            
        }      

        customer = await this.customerRepo.registration(entity);
        return this.ok(new CustomerRegistrationUCResponse(customer.id, customer.name, customer.email, customer.phone))        
    }
}