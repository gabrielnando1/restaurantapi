export const TYPES_REPOSITORY = {
    ICustomerRepository: Symbol.for("ICustomerRepository"),
    IMenuRepository: Symbol.for("IMenuRepository"),
    IOrderRepository: Symbol.for("IOrderRepository"),
    IOrderItemRepository: Symbol.for("IOrderItemRepository"),
}


export const TYPES_UC = {    
    CustomerRegistrationUC: Symbol.for("CustomerRegistrationUC"), 
    MenuAddUC: Symbol.for("MenuAddUC"), 
    MenuListUC: Symbol.for("MenuListUC"),
    OrderCreateUC: Symbol.for("OrderCreateUC"),
    OrderListUC: Symbol.for("OrderListUC"),
    OrderStatusUC: Symbol.for("OrderStatusUC"),
    OrderModifyUC: Symbol.for("OrderModifyUC"),
}