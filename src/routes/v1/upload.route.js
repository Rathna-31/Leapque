const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const uploadController = require('../../controllers/upload.controller');
const {uploadFile, uploadCsvFile} = require('../../middlewares/uploadMiddleware');
const { Product } = require('../../models');
const productController = require('../../controllers/product.controller');


const router = express.Router();




router
    .route('/')
    .post(authMiddleware,uploadFile.single('file'),uploadController.updateUploads);

router
    .route('/fileUpload')
    .post(authMiddleware,uploadCsvFile.single('file'),productController.addUploadedProduct);

module.exports = router;

