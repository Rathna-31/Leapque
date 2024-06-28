const httpStatus = require('http-status');
const {
  productService
} = require('../services');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const express = require("express");
const app = express();
const {
  Product
} = require('../models');
//const csv = require('csv-parser');
const fs = require('fs')
const {Readable} = require('stream');
const validate = require('../middlewares/validate');
const path = require('path');
const csv = require('csvtojson');
const {validateFields} = require('../validations/uploadCSV.validation');
const {verifySchema,imgVerification} = require('../validations/upload.validation');



app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());




const addProduct = (async (req, res) => {
  try {

    const product = await productService.createProduct(req.body);
    console.log(req.body);
    console.log("Product Created");
    res.status(httpStatus.CREATED).send(product);
  } catch (err) {
    res.status(httpStatus.BAD_GATEWAY).send(err);
    console.log(err);
  }
});




const getAllProducts = async (req, res) => {
  try {

    const category = req.query.category;
    const publish = req.query.publish;

    if (!category && !publish) {
      const getAll = await productService.allProducts();
      console.log("Fetched all Products");
      res.status(httpStatus.OK).send(getAll);

    } 
    else if(category && publish)
    {
       const getByPublish = await productService.getCategoryByPublish(category);
       console.log("Category Fetched");
       res.status(httpStatus.OK).send(getByPublish);
    }
    else {
      
      const productCat = await productService.getAllByCategory(category);
      console.log("Category Fetched");
      res.status(httpStatus.OK).send(productCat);
    }

  } catch (err) {
    res.status(httpStatus.BAD_GATEWAY).send(err);
    console.log(err)
  }

}


const getAllByCategory = async (req, res) => {

  try {
    const categoryName = req.query.category;
    const productCat = await productService.getAllByCategory(categoryName);
    console.log("Category Fetched");
    res.status(httpStatus.OK).send(productCat);

  } catch (err) {
    res.status(httpStatus.BAD_GATEWAY).send(err);
    console.log(err);
  }
}

const getCategoryCount = async (req, res) => {
  try {
    const categoryCount = await productService.getCategoryCount();
    res.status(httpStatus.OK).send(categoryCount);
  } catch (err) {
    res.status(httpStatus.BAD_GATEWAY).send(err);
    console.log(err);
  }
}

const updateProduct = async (req, res) => {

  try {
    const id = req.params.id;
    const dataBody = req.body;

    const checkProduct = Product.findById(id, async (err) => {

      if (err) {
        res.status(httpStatus.NOT_FOUND).send("No Data Is Found In The Database For This Id" + "\n" + err);
      } else {
        const updateById = await productService.updateProductById(id, dataBody);
        res.status(httpStatus.OK).send(updateById);
      }
    });

    // console.log("value for the id is here ***************",checkProduct);

    // if(checkProduct!=null)
    // {
    // const updateById = await productService.updateProductById(id,dataBody);
    // res.status(httpStatus.OK).send(updateById);
    // }
    // else{

    //     res.status(httpStatus.NOT_FOUND).send("Data not found for given ID");
    // }
  } catch (err) {
    res.status(httpStatus.BAD_GATEWAY).send(err);
    console.log(err);
  }
}

const deleteProduct = async (req, res) => {

  try {
    const productId = req.params.id;

    const checkProduct = Product.findById(productId, async (err) => {

      if (err) {
        res.status(httpStatus.NOT_FOUND).send("Not Data Is Found In The Database For This Id" + "\n" + err);
      } else {
        const deleteById = await productService.deleteProductById(productId);
        res.status(httpStatus.OK).send("Record Successfully Deleted");
      }
    });

  } catch (err) {
    res.status(httpStatus.BAD_GATEWAY).send(err);
    console.log(err);
  }
}

const updatePublish = async(req,res)=>{

  try
  {
  const id = req.query.id;
  const publish = req.query.publish;
  const publishUpdate = await productService.updatePublish(id,publish);
  res.status(httpStatus.OK).send("Updated Successfully");
  }
  catch(err)
  {
    console.log(err);
    res.status(httpStatus.BAD_GATEWAY).send(err);
  }

}

const updateActive = async(req,res)=>{

  try
  {
    const id = req.query.id;
    const active = req.query.active;
    const activeUpdate = await productService.updateActive(id,publish);
    res.status(httpStatus.OK).send("Updated Successfully");
  }
  catch(err)
  {
    console.log(err);
    res.status(httpStatus.BAD_GATEWAY).send(err);
  }


}

const addUploadedProduct = async(req,res)=>{

  try
  {
  let tempStorage = path.join(__dirname,"../docs/uploads/",req.file.originalname);
  const resultArray = await csv().fromFile(tempStorage);
  let imgResponse = null;
  let i = 0;

  const verifyAndConvert = async()=>{

    for(i = 0;i < resultArray.length; i++ ) 
    {
      resultArray[i].price = Number(resultArray[i].price);
      imgResponse = await imgVerification(resultArray[i].img);

      if(imgResponse == false)
      {
        console.log("This image url doesn't exist :",resultArray[i].img)
        break;
      }
    }

 }

const callVerification = await verifyAndConvert();
console.log("img response",imgResponse)



console.log(resultArray);

  const verifyProduct = await verifySchema.validate(resultArray);
 
  if(verifyProduct.error || imgResponse == false)
  {

    if(verifyProduct.error)
    {
      console.log("Error Occured in Validating Product Data");
      console.log(verifyProduct.error.details);
      res.status(httpStatus.BAD_REQUEST).send("Error Occured While Verifying the Product Data   \n" + verifyProduct.error);
    }
    else if(imgResponse == false)
    {
      console.log("error img url validation : ",resultArray[i].img);
      res.status(httpStatus.BAD_REQUEST).send("Error Occured While Verifying  image Url does'nt exist please check the below URl   \n" + resultArray[i].img);
    }
  }
  else
  {
    console.log("Verification Successfull");
    const addProduct = await productService.createProduct(resultArray);
     res.status(httpStatus.OK).send("Products added successfully \n" + addProduct);
  }


  

 fs.unlink(tempStorage,(err)=>{
  if(err)
  {
    console.log(err);
  }
  else{
    console.log("file successfully deleted");
  }
 });
 
 }
 catch(err)
 {
  console.log(err);
  res.status(httpStatus.BAD_REQUEST).send(err);
 }
}



module.exports = {
  addProduct,
  getAllProducts,
  getAllByCategory,
  getCategoryCount,
  updateProduct,
  deleteProduct,
  updatePublish,
  updateActive,
  addUploadedProduct
};
