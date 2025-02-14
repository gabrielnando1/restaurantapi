import { TYPES_UC } from "../../domain/interface/types.js";
import { CustomerRegistrationUCRequest } from "../../domain/user_case/customer/registration/customer.registration.uc.request.js";
import { ioc } from '../ioc/ioc.js'

export const CustomerController = function (app){
    let tag = 'customer';

    let customerRegistrationUC = ioc.get(TYPES_UC.CustomerRegistrationUC);

    app.get(`/${tag}`, async (req, res) => {
        let response = await customerRegistrationUC.handler(new CustomerRegistrationUCRequest('teste', '', ''))        
        res.send(response)
    });


    app.post(`/${tag}`, async (req, res) => {
        const { name, email, phone } = req.body;
/*
        if (!name || !email ) {
            return res.status(400).json({ erro: 'required fields!' });
        }
            */
        let response = await customerRegistrationUC.handler(new CustomerRegistrationUCRequest(name, email, phone))        
        res.status(response.issue.statusCode).json(response);        
    });
}

