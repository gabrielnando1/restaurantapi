class OrderListUCResponse {
    constructor(order_id, order_dishes, total_value, status) {
        this.order_id = order_id
        this.order_dishes = order_dishes
        this.total_value = total_value;
        this.status = status;
    }
}


class OrderDishesListUCResponse {
    constructor(menu_id, menu_name, menu_category, quantity, price) {
        this.menu_id = menu_id
        this.menu_name = menu_name
        this.menu_category = menu_category;
        this.quantity = quantity;
        this.price = price;
    }
}


export { OrderListUCResponse, OrderDishesListUCResponse };