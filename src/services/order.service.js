const {Order} = require('../models');
const { findOneAndUpdate } = require('../models/customerLog.model');


const createOrder = async(userBody)=>{
   
   console.log("UserBody  : ",userBody);
   return Order.create(userBody);
}


const getAllOrderDetails = async()=>{
   
   return Order.find({},(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    console.log(result)
   })

}

const getOrderByNumber = async(orderNo)=>{

    return Order.find({orderNumber : orderNo},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        console.log(result);
    })
} 

const productQuantityUpdate = async(qty,orderId,productId)=>{
    return Order.updateOne({orderNumber : orderId, "products.productId" : productId},{$set : {"products.$.quantity" : qty}},(err)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
        console.log("Updated Quantity" , qty);
        }
    })
}

const deleteProductById = async(orderId,productId)=>{

    return Order.findOneAndUpdate({orderNumber : orderId},{$pull : {products : {productId : productId}}},(err)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
        console.log("Deleted the Product from the Record , ProductId :" ,productId);
        }
    });
}

const addProductToOrder = async(orderId,productDetails)=>{
    
try
{
  const getOrder = await Order.findOne({orderNumber : orderId});
  console.log("Get Order",getOrder);
  let products = getOrder['products'];
  console.log("Products ",products);
  products.push(productDetails);
  console.log("product Details",productDetails);
 

  

  const result = await Order.findOneAndUpdate({orderNumber : orderId},{$set : {products : products}},(err)=>{

    if(err)
    {
        console.log(err);
    }
   
  })

  return result;
}
catch(err)
{
   console.log("error : ",err);
   return err;
}

}

const deleteOrder = async(orderId)=>{

    return Order.findOneAndDelete({orderNumber : orderId},(err)=>{

        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Order Deleted Successfully \n OrderID :",orderId);
        }
    })
}




module.exports = {getAllOrderDetails,createOrder,getOrderByNumber,productQuantityUpdate,deleteProductById,addProductToOrder,deleteOrder}
