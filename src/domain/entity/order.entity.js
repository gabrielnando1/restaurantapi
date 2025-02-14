export class OrderEntity {
    constructor(id, customer_id, status = OrderStatusEnum.PENDING, items) {
        this.id = id;
        this.customer_id = customer_id;
        this.status = status;
        this.items = items;
    }
    
    

    isValidCustomerId() {
        if (!(this.customer_id) || (this.customer_id <= 0)) {
            return false;
        }
        return true;
    }

    isValidItems() {
        if (!(this.items) || (this.items.length <= 0)) {
            return false;
        }
        return true;
    }

    isValidStatus() {
        if (!(this.status) || !(this.status.trim())) {
            return false;
        }
        return Object.values(OrderStatusEnum).includes(this.status);
    }
}


export class OrderItemEntity {
    constructor(order_id, menu_id, quantity, menu = null) {
        this.order_id = order_id;
        this.menu_id = menu_id;        
        this.quantity = quantity;            
        this.menu = menu;
    }    

    isValidItem() {
        if (!(this.menu_id) || (this.menu_id <= 0)) {
            return false;
        }
        if (!(this.quantity) || (this.quantity <= 0)) {
            return false;
        }
        return true;
    }
}



export const OrderStatusEnum = {
    PENDING: 'pending',
    PREPARING: 'preparing',
    READY: 'ready',
    DELIVERED: 'delivered',
    CANCELED: 'canceled'
  };
  