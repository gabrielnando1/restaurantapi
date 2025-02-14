export class OrderModifyUCRequest {
    constructor(order_id, items) {
        this.order_id = order_id;
        this.items = items;
    }
}

export class OrderModifyItemUCRequest {
    constructor(menu_item_id, quantity) {
        this.menu_item_id = menu_item_id;
        this.quantity = quantity;
    }
}