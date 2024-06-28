const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const uploadSchema = mongoose.Schema(

    {
        fileName : {
            type : String,
            required : true,
            trim : true
     },
        userId : {
            type : String,
            required : true,
            trim : true
        },
        location : {
            type : String,
            required : true,
            trim : true
        },
        uploadDate : {
            type : Date,
            required : true,
        }

    }

);


uploadSchema.plugin(toJSON);
uploadSchema.plugin(paginate);

const upload = mongoose.model('upload',uploadSchema);

module.exports = upload;