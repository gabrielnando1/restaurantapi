export class MenuListUCRequest {
    constructor(category = undefined, page = 1, limit = 10) {
        this.category = category;
        this.page = page;
        this.limit = limit;
    }
}