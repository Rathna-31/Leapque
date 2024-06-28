const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const customerController = require('../../controllers/customer.controller');
const validate = require('../../middlewares/validate');
const customerValidation = require('../../validations/customer.validation');
const addressvalidation = require('../../validations/address.validation');




router
    .route('/')
    .get(authMiddleware,validate(customerValidation.customerIdValidation),customerController.getCustomer)
    .post(authMiddleware,validate(customerValidation.addCustomer),customerController.addCustomer);

router
    .route('/customerUpdate')
    .put(authMiddleware,validate(customerValidation.customerUpdateValidation),customerController.updateCustomer)
    .delete(authMiddleware,validate(customerValidation.deleteCustomer),customerController.deleteCustomerDetails);

router
    .route('/address')
    .get(authMiddleware,validate(addressvalidation.customerIdValidation),customerController.getAddress)
    .post(authMiddleware,validate(addressvalidation.addAddress),customerController.addAddress);

router
    .route('/addressUpdate')
    .put(authMiddleware,validate(addressvalidation.addressUpdateValidation),customerController.updateCustomerAddress)
    .delete(authMiddleware,validate(addressvalidation.deleteAddress),customerController.deleteAddress)


module.exports = router;