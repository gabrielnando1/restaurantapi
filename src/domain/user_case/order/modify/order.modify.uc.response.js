class OrderModifyUCResponse {
    constructor(order_id, items) {
        this.order_id = order_id;        
        this.items = items;
    }
}

class OrderModifyItemUCResponse {
    constructor(menu_item_id, quantity) {
        this.menu_item_id = menu_item_id;        
        this.quantity = quantity;
    }
}

export { OrderModifyUCResponse, OrderModifyItemUCResponse };