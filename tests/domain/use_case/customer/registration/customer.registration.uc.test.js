import { constants as httpConstants } from 'http2';
import { TYPES_UC } from "../../../../../src/domain/interface/types.js";
import { ioc } from '../../../../ioc/ioc.js'
import { CustomerRegistrationUCRequest } from "../../../../../src/domain/user_case/customer/registration/customer.registration.uc.request.js"

const customerRegistrationUC = ioc.get(TYPES_UC.CustomerRegistrationUC);


test('CustomerRegistrationUC empty request parameter', async () => {
    let response = await customerRegistrationUC.handler();


    expect(response).toEqual(expect.objectContaining({
        issue: {
            success : false,
            statusCode: httpConstants.HTTP_STATUS_BAD_REQUEST,
            erroMessage: 'invalid parameters!'
        }        
      }));
});


test('CustomerRegistrationUC empty name parameter', async () => {
    let response = await customerRegistrationUC.handler(new CustomerRegistrationUCRequest(null, 'test@teste.com', '1234-5678'));


    expect(response).toEqual(expect.objectContaining({
        issue: {
            success : false,
            statusCode: httpConstants.HTTP_STATUS_BAD_REQUEST,
            erroMessage: 'invalid name!'
        }        
      }));
});


test('CustomerRegistrationUC email already exists', async () => {
    let response = await customerRegistrationUC.handler(new CustomerRegistrationUCRequest('teste', 'one@customer.com', '1234-5678'));


    expect(response).toEqual(expect.objectContaining({
        issue: {
            success : false,
            statusCode: httpConstants.HTTP_STATUS_BAD_REQUEST,
            erroMessage: 'email already exists!'
        }        
      }));
});