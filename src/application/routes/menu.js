/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu operations
 */


/**
* @swagger
* /menu:
*   get:
*     summary: List menus
*     tags: [Menu]
*     parameters:
*       - in: query
*         name: category
*         required: false
*         schema:
*           type: string
*           enum: [starter, main_course, dessert, drink]
*         description: category for filter (opcional).   
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
*                       id:
*                         type: integer
*                         description: The menu ID.
*                         example: 0
*                       name:
*                         type: string
*                         description: name. 
*                       description:
*                         type: string
*                         description: description. 
*                       price:
*                         type: number
*                         format: float
*                         description: price. 
*                       category:
*                         type: string
*                         description: category.
*/


/**
* @swagger
* /menu:
*   post:
*     summary: Add Menu
*     tags: [Menu]
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               type: object
*               properties:
*                 name:
*                   type: string
*                   description: menu name
*                 description:
*                   type: string
*                   description: menu description
*                 price:
*                   type: number
*                   format: float
*                   description: menu price
*                 category:
*                   type: string
*                   description: menu category
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
*                       description: menu id
*                     name:
*                       type: string
*                       description: menu name
*                     description:
*                       type: string
*                       description: menu description
*                     price:
*                       type: number
*                       format: float
*                       description: menu price
*                     category:
*                       type: string
*                       description: menu category
*/
