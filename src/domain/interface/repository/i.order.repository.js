export const IOrderRepository =
{
    add: async function (order) { },
    findByCustomer: async function (customer_id, page = 1, limit = 10) { },
    findOneById: async function (id) { },
    updateStatus: async function(id, status)  { }
};
