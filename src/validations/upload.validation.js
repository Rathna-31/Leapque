const Joi = require('joi');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const updateFileUpload = {

    body : Joi.object().keys(
        {
            fileName : Joi.string().required(),
            userId: Joi.string().required(),
            location: Joi.string().required(),
            uploadDate : Joi.date().required()
        }
    )
} 

const verifySchema = Joi.array().items(
            
    Joi.object(  
    {
            productName : Joi.string().min(3).max(30).required(),
            shortDescription : Joi.string().min(5).max(120).required(),
            price :Joi.number().required().min(1).required(),
            category : Joi.string().required().min(3).max(20).required(),
            img : Joi.string()

    })
    );  
    
    
    const imgVerification = async(url)=>{
    
        return new Promise( res => {
        var request = new XMLHttpRequest();
        request.open("GET",url,true);
        request.send();
        request.onload = ()=>{
        if(request.status == 200)
        {
         res(true);
        }
        else
        {
         res(false);
        }
    }
   

});
    }

   



module.exports = {updateFileUpload,verifySchema,imgVerification};


