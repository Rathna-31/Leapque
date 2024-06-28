const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();




router
  .route('/')
  .get(authMiddleware,validate(productValidation.categoryValidation),productController.getAllProducts)
  .post(authMiddleware, validate(productValidation.addProduct),productController.addProduct);

router
  .route('/:id')
  .put(authMiddleware,validate(productValidation.updateValidation),productController.updateProduct)
  .delete(authMiddleware,validate(productValidation.deleteValidation),productController.deleteProduct);

router
  .route('/updatePublish/:id')
  .put(authMiddleware,validate(productValidation.updatePublish),productController.updatePublish);

router
  .route('/updateActive/:id')
  .put(authMiddleware,validate(productValidation.updateActive),productController.updateActive);

  
router
  .route('/categories')
  .get(authMiddleware,productController.getCategoryCount);







module.exports = router;