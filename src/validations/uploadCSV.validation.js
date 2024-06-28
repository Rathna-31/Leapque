// const validate = require('jsonschema').validate;
const validator = require('jsonschema').Validator;
const v = new validator();



let productSchema = {
    "type" : "array",
    "items" : {
     "type" : "object",   
    "properties" : {
    "productName" : {"type": "string","minLength" : 3,"maxLength" : 30},
    "shortDescription" : {"type": "string","minLength" : 3,"maxLength" : 100},
    "price" : {"type" : "integer","minimum":1},
    "category" : {"type": "string","minLength" : 3,"maxLength" : 15},
    },
},
    required : ["productName","price","shortDescription","category"] 
}

const validateFields = async(productData)=>{

  try
  {
    const result = v.validate(productData, productSchema);
    console.log(result);
    if(result.valid == true)
    {
        return null;
    }
    else
    {
    return result.errors;
   }
  }
  catch(err)
  {
    console.log(err);
  }

}

module.exports = {validateFields};

 

