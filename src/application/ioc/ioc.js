import "reflect-metadata";
import { Container, injectable, decorate, inject } from "inversify";
import { TYPES_REPOSITORY, TYPES_UC } from "../../domain/interface/types.js";


import CustomerPgRepository from "../../infrastructure/repository/postgresql/customer.pg.repository.js";
import MenuPgRepository from "../../infrastructure/repository/postgresql/menu.pg.repository.js";
import OrderPgRepository from "../../infrastructure/repository/postgresql/order.pg.repository.js";
import OrderItemPgRepository from "../../infrastructure/repository/postgresql/order_item.pg.repository.js";


import { CustomerRegistrationUC } from "../../domain/user_case/customer/registration/customer.registration.uc.js";
import { MenuListUC } from '../../domain/user_case/menu/list/menu.list.uc.js'
import { MenuAddUC } from '../../domain/user_case/menu/add/menu.add.uc.js'
import { OrderCreateUC } from '../../domain/user_case/order/create/order.create.uc.js'
import { OrderListUC } from '../../domain/user_case/order/list/order.list.uc.js'
import { OrderStatusUC } from '../../domain/user_case/order/status/order.status.uc.js'
import { OrderModifyUC } from '../../domain/user_case/order/modify/order.modify.uc.js'



function annotate(constructor, dependencies) {
    decorate(injectable(), constructor);
    (dependencies || []).forEach(function(dependency, index) {
        decorate(inject(dependency), constructor, index);
    });
}

export const ioc = new Container();

export function Initialize(){
    // REPOSITORY
    annotate(CustomerPgRepository);
    ioc.bind(TYPES_REPOSITORY.ICustomerRepository).to(CustomerPgRepository); 
    annotate(MenuPgRepository);
    ioc.bind(TYPES_REPOSITORY.IMenuRepository).to(MenuPgRepository); 
    annotate(OrderPgRepository);
    ioc.bind(TYPES_REPOSITORY.IOrderRepository).to(OrderPgRepository);
    annotate(OrderItemPgRepository);
    ioc.bind(TYPES_REPOSITORY.IOrderItemRepository).to(OrderItemPgRepository);

    const typeRepos = [TYPES_REPOSITORY.ICustomerRepository, TYPES_REPOSITORY.IMenuRepository, TYPES_REPOSITORY.IOrderRepository, TYPES_REPOSITORY.IOrderItemRepository]

    // USER CASE    
    annotate(CustomerRegistrationUC, typeRepos);
    ioc.bind(TYPES_UC.CustomerRegistrationUC).to(CustomerRegistrationUC); 
    annotate(MenuListUC, typeRepos);
    ioc.bind(TYPES_UC.MenuListUC).to(MenuListUC); 
    annotate(MenuAddUC, typeRepos);
    ioc.bind(TYPES_UC.MenuAddUC).to(MenuAddUC); 
    annotate(OrderCreateUC, typeRepos);
    ioc.bind(TYPES_UC.OrderCreateUC).to(OrderCreateUC);
    annotate(OrderListUC, typeRepos);
    ioc.bind(TYPES_UC.OrderListUC).to(OrderListUC);
    annotate(OrderStatusUC, typeRepos);
    ioc.bind(TYPES_UC.OrderStatusUC).to(OrderStatusUC);
    annotate(OrderModifyUC, typeRepos);
    ioc.bind(TYPES_UC.OrderModifyUC).to(OrderModifyUC);    
}