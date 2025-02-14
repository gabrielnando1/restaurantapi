class OrderCreateUCResponse {
    constructor(id, customer_id, items) {
        this.id = id
        this.customer_id = customer_id;
        this.items = items;
    }
}

class OrderCreateItemUCResponse {
    constructor(menu_item_id, menu_item_name, menu_item_category, quantity) {
        this.menu_item_id = menu_item_id;
        this.menu_item_name = menu_item_name;
        this.menu_item_category = menu_item_category;
        this.quantity = quantity;
    }
}

export { OrderCreateUCResponse, OrderCreateItemUCResponse };