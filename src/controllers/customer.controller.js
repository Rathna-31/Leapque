const httpStatus = require('http-status');
const {customerService} = require('../services');
const {Customer,Address} = require('../models');




const addCustomer = async(req,res)=>{
    try
    {
    const addCustomerData = await customerService.addCustomer(req.body);
    res.status(httpStatus.OK).send("Customer Data is Successfully Updated");
    }
    catch(err)
    {
       res.status(httpStatus.BAD_GATEWAY).send(err);
       console.log(err);
    }
}

const addAddress = async(req,res)=>{
    try
    {
    const addCustomerAddress = await customerService.addAddress(req.body);
    res.status(httpStatus.OK).send("Address is Successfully added");
    }
    catch(err)
    {
       res.status(httpStatus.BAD_GATEWAY).send(err);
       console.log(err);
    }
}



const getAddress = async(req,res)=>{
   
    const customerId = req.query.id;

    if(!customerId)
    {
        try
        {
           const getAll = await customerService.getAllCustomerAddress();
           res.status(httpStatus.OK).send(getAll);
        }
        catch(err)
        {
            res.status(httpStatus.BAD_GATEWAY).send(err)
        }
    }
    else{
        try
        {
          const getById = await customerService.getCustomerAddressById(customerId);
          res.status(httpStatus.OK).send(getById);
        }
        catch(err)
        {
            res.status(httpStatus.BAD_GATEWAY).send(err)
        }

    }

   
}


const getCustomer = async(req,res)=>{
   
    const customerId = req.query.id;

    if(!customerId)
    {
        try
        {
           const getAll = await customerService.getAllCustomer();
           res.status(httpStatus.OK).send(getAll);
        }
        catch(err)
        {
            res.status(httpStatus.BAD_GATEWAY).send(err)
        }
    }
    else{
        try
        {
          const getById = await customerService.getCustomerById(customerId);
          res.status(httpStatus.OK).send(getById);
        }
        catch(err)
        {
            res.status(httpStatus.BAD_GATEWAY).send(err)
        }

    }

   
}

const updateCustomer = async(req,res)=>{

    const customerId = req.query.customerId;
    const dataBody = req.body; 
  
    try
    {
       Customer.find({customerId : customerId},async(err,result)=>{
        if(err || result == null)
        {
            res.status(httpStatus.NOT_FOUND).send("No Data Is Found In The Database For This Id" + "\n" + err);
            console.log(err);
        }
        else
        {
            const updateId = await customerService.updateCustomer(customerId,dataBody); 
            res.status(httpStatus.OK).send("Updated Successfully ");
        }
       })
    }
    catch(err)
    {
       res.status(httpStatus.BAD_GATEWAY).send(err);
       console.log(err);
    }

}

const updateCustomerAddress = async(req,res)=>{

    const customerId = req.query.customerId;
    const dataBody = req.body; 
  
    try
    {
       Address.find({customerId : customerId},async(err,result)=>{
        if(err || result == null)
        {
            res.status(httpStatus.NOT_FOUND).send("No Data Is Found In The Database For This Id" + "\n" + err);
            console.log(err);
        }
        else
        {
            const updateId = await customerService.updateCustomerAddress(customerId,dataBody); 
            res.status(httpStatus.OK).send("Updated Successfully ");
        }
       })
    }
    catch(err)
    {
       res.status(httpStatus.BAD_GATEWAY).send(err);
       console.log(err);
    }

}

const deleteAddress = async(req,res)=>{
  
    try
    {
    const customerId = req.query.customerId;

    Address.find({customerId : customerId},async(err,result)=>{

        if(err || result == null)
        {
            res.status(httpStatus.NOT_FOUND).send("This Customer ID Doesn't Exist");
        }
        else
        {
            const deleteById = await customerService.deleteAddress(customerId);
            res.status(httpStatus.OK).send(" Deleted Successfully ");
        }

    })
    }
    catch(err)
    {
        console.log(err);
    }

    
}

const deleteCustomerDetails = async(req,res)=>{

    try
    {
    const customerId = req.query.customerId;

    Customer.find({customerId : customerId},async(err,result)=>{

        if(err || result == null)
        {
            res.status(httpStatus.NOT_FOUND).send("This Customer ID Doesn't Exist");
        }
        else
        {
            const deleteById = await customerService.deleteCustomerDetails(customerId);
            res.status(httpStatus.OK).send(" Deleted Successfully ");
        }

    })
    }
    catch(err)
    {
        console.log(err);
    }


}







module.exports = {addCustomer,addAddress,getCustomer,updateCustomer,updateCustomerAddress,getAddress,deleteAddress,deleteCustomerDetails}