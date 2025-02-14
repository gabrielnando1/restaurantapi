export class OrderCreateUCRequest {
    constructor(customer_id, items) {
        this.customer_id = customer_id;
        this.items = items;
    }
}

export class OrderCreateItemUCRequest {
    constructor(menu_item_id, quantity) {
        this.menu_item_id = menu_item_id;
        this.quantity = quantity;
    }
}