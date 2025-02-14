import "reflect-metadata";
import { Container, injectable, decorate, inject } from "inversify";
import { TYPES_REPOSITORY, TYPES_UC } from "../../src/domain/interface/types.js";


import CustomerMockRepository from "../../src/infrastructure/repository/mock/customer.mock.repository.js"
import MenuMockRepository from "../../src/infrastructure/repository/mock/menu.mock.repository.js";
import OrderItemMockRepository from "../../src/infrastructure/repository/mock/order_item.mock.repository.js";
import OrderMockRepository from "../../src/infrastructure/repository/mock/order.mock.repository.js";


import { CustomerRegistrationUC } from "../../src/domain/user_case/customer/registration/customer.registration.uc.js";
import { MenuListUC } from '../../src/domain/user_case/menu/list/menu.list.uc.js'
import { MenuAddUC } from '../../src/domain/user_case/menu/add/menu.add.uc.js'
import { OrderCreateUC } from '../../src/domain/user_case/order/create/order.create.uc.js'
import { OrderListUC } from '../../src/domain/user_case/order/list/order.list.uc.js'
import { OrderStatusUC } from '../../src/domain/user_case/order/status/order.status.uc.js'
import { OrderModifyUC } from '../../src/domain/user_case/order/modify/order.modify.uc.js'



function annotate(constructor, dependencies) {
    decorate(injectable(), constructor);
    (dependencies || []).forEach(function(dependency, index) {
        decorate(inject(dependency), constructor, index);
    });
}

export const ioc = new Container();

export function Initialize(){
    // REPOSITORY
    annotate(CustomerMockRepository);
    ioc.bind(TYPES_REPOSITORY.ICustomerRepository).to(CustomerMockRepository); 
    annotate(MenuMockRepository);
    ioc.bind(TYPES_REPOSITORY.IMenuRepository).to(MenuMockRepository); 
    annotate(OrderMockRepository);
    ioc.bind(TYPES_REPOSITORY.IOrderRepository).to(OrderMockRepository);
    annotate(OrderItemMockRepository);
    ioc.bind(TYPES_REPOSITORY.IOrderItemRepository).to(OrderItemMockRepository);

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