const multer = require('multer');
const path = require('path');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');

dotenv.config();


aws.config.update({
    secretAccessKey: process.env.S3_SECRET_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: 'ap-northeast-1',
  });  


const S3 = new aws.S3();


const multerS3Config = multerS3(
    {
        s3 : S3,
        //acl : 'public-read',
        bucket : "leapque.com",
        metadata : (req,file,cb)=>{
            cb(null,{fieldName : file.fieldname});
        },
        key : (req,file,cb)=>{

            console.log("request Body");
            cb(null, file.originalname.replace(/\.[^/.]+$/,"") + '_' + Date.now());
        }

    }
);
 

    
var maxSize = 4 * 1000 * 1000 * 1000;
    
            
const  fileCheck =  (req,file,cb)=> {

            var fileType = /jpeg|jpg|png|pdf|csv/;
            var mimetype = fileType.test(file.mimetype);
            var extname = fileType.test(path.extname(file.originalname));

            if(mimetype && extname)
            {
                return cb(null,true);
            }
            else{

                cb("Error : Only Supports the Following FileTypes : " + fileType);
            }

        }

        const fileStorage = multer.diskStorage(
            {
                destination : function(req,file,cb)
                {
                    cb(null,path.join(__dirname,"../docs/uploads"));            
                },
        
                filename : function(req,file,cb){
        
                    cb(null,file.originalname);
                }
            }
        )
        

     

        const uploadFile = multer(
            {
                storage : multerS3Config,
                fileFilter : fileCheck,
           }
        );   


        const uploadCsvFile = multer(
          {
            storage : fileStorage,
            fileFilter : fileCheck
          }
        )





    
     
   
   
            
    //  const uploadFile = multer({storage : fileStorage , fileFilter : fileCheck});



module.exports = {uploadFile,uploadCsvFile}

    

