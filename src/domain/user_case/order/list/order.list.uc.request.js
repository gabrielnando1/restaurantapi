export class OrderListUCRequest {
    constructor(customer_id, page = 1, limit = 10) {
        this.customer_id = customer_id;
        this.page = page;
        this.limit = limit;
    }
}