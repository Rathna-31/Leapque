const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const validate = require('../../middlewares/validate');
const orderController = require('../../controllers/order.controller');
const orderValidation = require('../../validations/order.validation');



router
    .route('/')
    .get(authMiddleware,validate(orderValidation.orderIdValidation),orderController.getOrderDetails)
    .post(authMiddleware,validate(orderValidation.addOrder),orderController.addOrder)
    .delete(authMiddleware,validate(orderValidation.deleteOrder),orderController.deleteOrder);

router
    .route('/productUpdate')
    .put(authMiddleware,validate(orderValidation.updateProduct),orderController.productQuantityUpdate)
    

router
    .route('/addProduct')
    .post(authMiddleware,validate(orderValidation.addProduct),orderController.addProductToOrder)

    
module.exports = router;