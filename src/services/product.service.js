const httpStatus = require('http-status');
const {
  Product
} = require('../models');




const createProduct = async (userBody) => {
  console.log("createProduct ", userBody);
  return Product.create(userBody);
}


const allProducts = async () => {
  return Product.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result)
  })
}



const getAllByCategory = async (categoryName) => {


  return Product.find({
    category: categoryName 
  }, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

const getCategoryByPublish = async (categoryName) => {


  return Product.find({
    category: categoryName , publish : true
  }, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}


const getCategoryCount = async () => {
  return Product.aggregate([{
    $group: {
      _id: '$category',
      count: {
        $sum: 1
      }
    }
  }], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result)
  });
}

const updateProductById = async (id, dataBody) => {

  return Product.findByIdAndUpdate(id, dataBody, (err, result) => {

    if (err) {
      console.log(err);
    }
    console.log(result);
  });

}

const deleteProductById = async (productId) => {

  return Product.findByIdAndDelete(productId, (err) => {
    if (err) {
      console.log(err)
    } else {

      console.log("Record : ", productId, " is Deleted Successfully");
    }
  })

}

const updatePublish = async(id,publish)=>{

  return await Product.findByIdAndUpdate(id,{publish : publish},(err)=>{
    
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("Updated Product : ",publish);
    }
  })
}

const updateActive = async(id,active)=>{

  return await Product.findByIdAndUpdate(id,{active : active},(err)=>{
    
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("Updated Active : ",active);
    }
  })
}

module.exports = {
  createProduct,
  allProducts,
  getCategoryCount,
  getAllByCategory,
  updateProductById,
  deleteProductById,
  updatePublish,
  updateActive,
  getCategoryByPublish
}
