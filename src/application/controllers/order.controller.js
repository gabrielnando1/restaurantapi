import { TYPES_UC } from "../../domain/interface/types.js";
import { OrderCreateUCRequest, OrderCreateItemUCRequest } from "../../domain/user_case/order/create/order.create.uc.request.js";
import { OrderListUCRequest } from "../../domain/user_case/order/list/order.list.uc.request.js";
import { OrderStatusUCRequest } from "../../domain/user_case/order/status/order.status.uc.request.js";
import { OrderModifyUCRequest, OrderModifyItemUCRequest } from "../../domain/user_case/order/modify/order.modify.uc.request.js";
import { ioc } from '../ioc/ioc.js'

export const OrderController = function (app){
    let tag = 'order';
    
    let orderCreateUC = ioc.get(TYPES_UC.OrderCreateUC);
    let orderListUC = ioc.get(TYPES_UC.OrderListUC);
    let orderStatusUC = ioc.get(TYPES_UC.OrderStatusUC);    
    let orderModifyUC = ioc.get(TYPES_UC.OrderModifyUC);
    
    app.post(`/${tag}`, async (req, res) => {
        const { customer_id, items } = req.body;

        if (!customer_id || !items) {
            return res.status(400).json({ erro: 'required fields!' });
        }
        let request = new OrderCreateUCRequest(customer_id, items.map(item => (new OrderCreateItemUCRequest(
            item.menu_item_id,                
            item.quantity
        ))))
        let response = await orderCreateUC.handler(request)        
        res.status(response.issue.statusCode).json(response);        
    });


    app.get(`/${tag}/:customer_id`, async (req, res) => {        
        const { customer_id } = req.params;      
        const { page, limit } = req.query;  
        let response = await orderListUC.handler(new OrderListUCRequest(customer_id, page, limit))        
        res.status(response.issue.statusCode).json(response);        
    });

    app.patch(`/${tag}/:order_id`, async (req, res) => {        
        const { order_id } = req.params;      
        const { status } = req.body;  
        let response = await orderStatusUC.handler(new OrderStatusUCRequest(order_id, status))        
        res.status(response.issue.statusCode).json(response);        
    });

    app.patch(`/${tag}/modify/:order_id`, async (req, res) => {        
        const { order_id } = req.params;      
        const { items } = req.body;  
        let response = await orderModifyUC.handler(new OrderModifyUCRequest(order_id, items.map(item => (new OrderModifyItemUCRequest(
            item.menu_item_id,                
            item.quantity
        )))));        
        res.status(response.issue.statusCode).json(response);        
    });
}