const {Customer,Address} = require('../models');
const { findByIdAndUpdate } = require('../models/customer.model');


const addCustomer = (userBody)=>{
    return Customer.create(userBody,(err)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            console.log(userBody);
        }
    });
}

const addAddress = (userBody)=>{
    return Address.create(userBody,(err)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            console.log(userBody);
        }
    });
}



const getAllCustomer = ()=>{

    return Customer.find({},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        console.log(result);
    })
}

const getAllCustomerAddress = ()=>{

    return Address.find({},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        console.log(result);
    })
}

const getCustomerById = (Id)=>{

    return Customer.find({customerId : Id},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        console.log(result);
    });

}

const getCustomerAddressById = (Id)=>{

    return Address.find({customerId : Id},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        console.log(result);
    });

}



const updateCustomer = (id,databody)=>{

    return Customer.findOneAndUpdate({customerId : id},databody,(err)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
        console.log("Updated Result" , databody);
        }
    })
}

const updateCustomerAddress = (id,databody)=>{

    return Address.findOneAndUpdate({customerId : id},databody,(err)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
        console.log("Updated Result" , databody);
        }
    })
}

const deleteAddress = async(id)=>{

    return Address.findOneAndDelete({customerId : id},(err)=>{
        
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Address Deleted Successfully");
        }
    })
}

const deleteCustomerDetails = async(id)=>{

    return Customer.findOneAndDelete({customerId : id},(err)=>{
        
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Customer Details Deleted Successfully");
        }
    })
}



module.exports = {addCustomer,addAddress,getAllCustomer,getAllCustomerAddress,getCustomerById,getCustomerAddressById,updateCustomer,updateCustomerAddress,deleteAddress,deleteCustomerDetails}