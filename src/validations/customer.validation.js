const Joi = require('joi');

const addCustomer = {
    body: Joi.object().keys(
        {
            customerId : Joi.string(),
            firstName : Joi.string(),
            lastName :Joi.string(),
            mobile : Joi.number(),
            email : Joi.string(),
            address : {
            address : Joi.string(),
            city : Joi.string(),
            state : Joi.string(),
            country : Joi.string(),
            postalCode : Joi.number(),
            coordinates :
            {
            latitude : Joi.number(),
            category : Joi.number()
            },
            tag : Joi.string()
            },
            channels : Joi.string(),
            fcmToken : Joi.string()
        }
    )
}

const customerIdValidation = {

    query : Joi.object().keys(
        {
            id : Joi.string()
        }
    )
}

const customerUpdateValidation = {

    body: Joi.object().keys(
        {
            firstName : Joi.string(),
            lastName :Joi.string(),
            mobile : Joi.number(),
            email : Joi.string(),
            address : {
            address : Joi.string(),
            city : Joi.string(),
            state : Joi.string(),
            country : Joi.string(),
            postalCode : Joi.number(),
            coordinates :
            {
            latitude : Joi.number(),
            category : Joi.number()
            },
            tag : Joi.string()
            },
            channels : Joi.string(),
            fcmToken : Joi.string()
            
        }
    ),

    query : Joi.object().keys(
        {
            customerId : Joi.string().required()
        }
    )

}

const deleteCustomer = {

    query : Joi.object().keys(
        {
            customerId : Joi.string().required()
        }
    )
}

module.exports = {addCustomer,customerIdValidation,customerUpdateValidation,deleteCustomer}