import { IssueUCResponse } from "./issue.uc.response.js";
import { constants as httpConstants } from 'http2';



export class BaseUC {
    constructor(        
        customerRepo,
        menuRepo,
        orderRepo,
        orderItemRepo
    ) {
        this.customerRepo = customerRepo;        
        this.menuRepo = menuRepo;
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
    }

    ok(content) {
        return { issue: new IssueUCResponse(true, httpConstants.HTTP_STATUS_OK, null), content: content }
    }
    
    error(message, statusCode = null, content = null) {
        return { issue: new IssueUCResponse(false, statusCode ?? httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message), content: content }
    }
}

