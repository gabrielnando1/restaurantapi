import { TYPES_UC } from "../../domain/interface/types.js";
import { MenuListUCRequest } from "../../domain/user_case/menu/list/menu.list.uc.request.js";
import { MenuAddUCRequest } from "../../domain/user_case/menu/add/menu.add.uc.request.js";
import { ioc } from '../ioc/ioc.js'

export const MenuController = function (app){
    let tag = 'menu';
    
    let menuListUC = ioc.get(TYPES_UC.MenuListUC);
    let menuAddUC = ioc.get(TYPES_UC.MenuAddUC);


    app.post(`/${tag}`, async (req, res) => {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ erro: 'required fields!' });
        }
        let response = await menuAddUC.handler(new MenuAddUCRequest(name, description, price, category))        
        res.status(response.issue.statusCode).json(response);        
    });


    app.get(`/${tag}`, async (req, res) => {        
        const { category, page, limit } = req.query;       
        let response = await menuListUC.handler(new MenuListUCRequest(category, page, limit))        
        res.status(response.issue.statusCode).json(response);        
    });
}

