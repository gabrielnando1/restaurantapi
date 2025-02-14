export const IOrderItemRepository =
{
    add: async function (order_item) { },
    findByOrder: async function(order_id) { },
    findOneByOrderAndMenu: async function (order_id, menu_id) { },    
    bulkDelete: async function (order_items) { },    
    bulkInsert: async function (order_items) { },    
    bulkUpdate: async function (order_items) { },    
};
