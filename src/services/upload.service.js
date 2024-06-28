
const httpStatus = require('http-status');
const { upload } = require('../models');




const updateFileUpload = async (userBody)=>{
    
    console.log("Upload File",userBody);
    return upload.create({fileName : userBody.file.originalname,userId : userBody.authUid , location : userBody.file.location , uploadDate : Date.now()});    
}



module.exports = {updateFileUpload}
