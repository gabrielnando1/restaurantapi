/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Customer operations
 */


/**
* @swagger
* /customer:
*   post:
*     summary: Register customer
*     tags: [Customer]
*     requestBody:
*       required: true
*       content:
*         application/json:
*             schema:
*               type: object
*               properties:
*                 name:
*                   type: string
*                   description: customer name
*                 email:
*                   type: string
*                   description: customer email
*                 phone:
*                   type: string
*                   description: customer phone
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
*                       description: customer id
*                     name:
*                       type: string
*                       description: customer name
*                     email:
*                       type: string
*                       description: customer email
*                     phone:
*                       type: string
*                       description: customer phone
*/
