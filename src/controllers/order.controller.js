const express = require('express');
const orderService = require('../services/order.service');
const httpStatus = require('http-status');
const {Order} = require('../models');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());





const addOrder = async(req,res)=>{

try
{
 const createOrder = await orderService.createOrder(req.body);
 res.status(httpStatus.OK).send(createOrder);
}
catch(err)
{
    res.status(httpStatus.BAD_GATEWAY).send(err);
    console.log(err);
}
}

const getOrderDetails = async(req,res)=>{

    try{
        const orderNumber = req.query.orderNo;

        if(!orderNumber)
        {
            const getAllOrder = await orderService.getAllOrderDetails();
            res.status(httpStatus.OK).send(getAllOrder);
            console.log("Fetched All Details");
        }
        else
        {
            const getByOrderNo = await orderService.getOrderByNumber(orderNumber);
            res.status(httpStatus.OK).send(getByOrderNo);
            console.log("Fetched Order Details By Order No");
        }
    }
    catch(err)
    {
        res.status(httpStatus.BAD_GATEWAY).send(err);
        console.log(err);
    }

} 

const productQuantityUpdate = async(req,res)=>{

    try
    {
    
    const qty = req.query.qty;
    const orderId = req.query.orderId;
    const productId = req.query.productId;

    console.log("orderId : ",orderId,"ProductId : ",productId,"Quantity :",qty);
    
    if(!qty && qty != 0)
    {
      res.status(httpStatus.NOT_FOUND).send("Pass a Valid Query");
    }
    else if(qty == 0)
    {
      Order.findOne({orderNumber : orderId},async(err,result)=>{
      
        if(err || result == null)
       {
        res.status(httpStatus.NOT_FOUND).send("No Data Is Found In The Database For This Id" + "\n" + err);
        console.log(err);
       }
       else
       {
        const deleteProduct = await orderService.deleteProductById(orderId,productId);
        res.status(httpStatus.OK).send("Deleted the Product from the List");
       }

      })
    }
    else
    {
        Order.findOne({orderNumber : orderId},async(err,result)=>{
       if(err || result == null)
       {
        res.status(httpStatus.NOT_FOUND).send("No Data Is Found In The Database For This Id" + "\n" + err);
        console.log(err);
       }
       else
       {
        const updateQty = await orderService.productQuantityUpdate(qty,orderId,productId);
        res.status(httpStatus.OK).send("Updated Successfully");
       }
    }
       );

    }
}
    catch(err)
    {
        res.status(httpStatus.BAD_GATEWAY).send(err);
        console.log(err);
    }

}

const addProductToOrder = async(req,res)=>{
 
    try
    {
        const orderId = req.query.orderId;
        const productDetails = req.body;
        console.log("add to order");
        
            if(!orderId)
            {
                res.status(httpStatus.NOT_FOUND).send("Order Id is not Provided" );
                console.log(err); 
            }
            else
            {
                console.log("else statement");
                const addProduct = await orderService.addProductToOrder(orderId,productDetails);
                console.log("\n\n\n Order Number :",addProduct.orderNumber)
                if(addProduct.orderNumber == orderId)
                {
                res.status(httpStatus.OK).send("Product added to the order Successfully : " + addProduct.products);
                }
                else
                {
                    res.status(httpStatus.NOT_FOUND).send(" Error :  " + addProduct + "\n" + "Please provide the correct Order ID"); 
                }
            }
        }
    catch(err)
    {
        res.status(httpStatus.BAD_GATEWAY).send(err);
        console.log(err);
    }

}

const deleteOrder = async(req,res)=>{
   
    const orderId = req.query.orderId; 
    Order.find({orderNumber : orderId},async(err,result)=>{
        if(err || result == null)
        {
            res.status(httpStatus.NOT_FOUND).send("No Data Is Found In The Database For This Id" + "\n" + err);
            console.log(err); 
        }
        else
        {
            const deleteById = await orderService.deleteOrder(orderId);
            res.status(httpStatus.OK).send("Order Deleted Successfully");

        }

    })
}



module.exports = {getOrderDetails,addOrder,productQuantityUpdate,addProductToOrder,deleteOrder}