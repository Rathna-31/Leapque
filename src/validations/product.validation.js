const Joi = require('joi');

const addProduct = {
    body: Joi.object().keys(
        {
            productName : Joi.string().required(),
            shortDescription : Joi.string().required(),
            price :Joi.number().required(),
            img : Joi.string().required(),
            category : Joi.string().required(),
            publish : Joi.boolean().required(),
            active : Joi.boolean().required(),
        }
    )
}

const categoryValidation = {

    query : Joi.object().keys(
        {
            category : Joi.string(),
            publish : Joi.string()
        }
    )
}

const updateValidation = {

    body: Joi.object().keys(
        {
            productName : Joi.string(),
            shortDescription : Joi.string(),
            price :Joi.number(),
            img : Joi.string(),
            category : Joi.string(),
            publish : Joi.boolean(),
            active : Joi.boolean()

        }
    ),

    params : Joi.object().keys(
        {
            id : Joi.string().required()
        }
    )

}

const deleteValidation = {

    params : Joi.object().keys(
        {
            id : Joi.string().required()
        }
    )
}

const updatePublish = {

    params : Joi.object().keys(
        
        {
            id : Joi.string().required()
        }
    ),

    query : Joi.object().keys(
        {
            publish : Joi.boolean().required()
        }
    )

}

const updateActive = {

    params : Joi.object().keys(
        
        {
            id : Joi.string().required()
        }
    ),

    query : Joi.object().keys(
        {
            active : Joi.boolean().required()
        }
    )
}


module.exports = {addProduct,categoryValidation,updateValidation,deleteValidation,updatePublish,updateActive};