const uploadService  = require('../services/upload.service');
const httpStatus = require('http-status');

const uploadFile = async(req,res)=>{
    
    
    console.log("auth id",req.authUid);
    console.log("file",req.file);
    console.log("body",req.body);
   
    res.send("Date : " + Date() + "\n" +  "File Name : " + req.file.filename + "\n" + "File Size : " + req.file.size );
    
        
}

const updateUploads = async(req,res)=>{

    const updateFile = await  uploadService.updateFileUpload(req);
    console.log("Uploaded File has been updated");
    res.status(httpStatus.CREATED).send(updateFile);


}



module.exports = {uploadFile,updateUploads}