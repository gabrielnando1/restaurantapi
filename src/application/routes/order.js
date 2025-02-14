/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order operations
 */


/**
* @swagger
* /order/{customer_id}:
*   get:
*     summary: List orders
*     tags: [Order]
*     parameters:
*       - in: path
*         name: customer_id
*         required: true
*         schema:
*           type: integer   
*         description: customer id.        
*       - in: query
*         name: page
*         required: false
*         schema:
*           type: integer
*         description: page (opcional).   
*       - in: query
*         name: limit
*         required: false
*         schema:
*           type: integer
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 issue:
*                   type: object
*                   properties:
*                     success:
*                       type: boolean
*                     statusCode:
*                       type: string
*                     erroMessage:
*                       type: string
*                 content:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       order_id:
*                         type: integer
*                         example: 0
*                       total_value:
*                         type: number
*                         format: float
*                         description: total value. 
*                       status:
*                         type: string
*                         description: category.
*                       order_dishes:
*                         type: array
*                         items:
*                           type: object
*                           properties:
*                             menu_id:
*                               type: integer
*                               example: 0
*                             menu_name:
*                               type: string
*                             menu_category:
*                               type: string
*                             quantity:
*                               type: integer
*                               example: 0
*                             price:
*                               type: number
*                               format: float
*/


/**
* @swagger
* /order:
*   post:
*     summary: Create Order
*     tags: [Order]
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               type: object
*               properties:
*                 customer_id:
*                   type: number
*                 items:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       menu_item_id:
*                         type: integer
*                       quantity:
*                         type: integer
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 issue:
*                   type: object
*                   properties:
*                     success:
*                       type: boolean
*                     statusCode:
*                       type: string
*                     erroMessage:
*                       type: string
*                 content:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                     customer_id:
*                       type: integer
*                     items:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           menu_item_id:
*                             type: integer
*                           menu_item_name:
*                             type: string
*                           menu_item_category:
*                             type: string
*                           quantity:
*                             type: integer
*/



/**
* @swagger
* /order/{order_id}:
*   patch:
*     summary: Update Order Status
*     tags: [Order]
*     parameters:
*       - in: path
*         name: order_id
*         required: true
*         schema:
*           type: integer   
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 issue:
*                   type: object
*                   properties:
*                     success:
*                       type: boolean
*                     statusCode:
*                       type: string
*                     erroMessage:
*                       type: string
*                 content:
*                   type: object
*                   properties:
*                     order_id:
*                       type: integer
*                     status:
*                       type: string
*/



/**
* @swagger
* /order/modify/{order_id}:
*   patch:
*     summary: Update Order Status
*     tags: [Order]
*     parameters:
*       - in: path
*         name: order_id
*         required: true
*         schema:
*           type: integer   
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               type: object
*               properties:
*                 items:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       menu_item_id:
*                         type: integer
*                       quantity:
*                         type: integer
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 issue:
*                   type: object
*                   properties:
*                     success:
*                       type: boolean
*                     statusCode:
*                       type: string
*                     erroMessage:
*                       type: string
*                 content:
*                   type: object
*                   properties:
*                     order_id:
*                       type: integer
*                     items:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           menu_item_id:
*                             type: integer
*                           quantity:
*                             type: integer
*/