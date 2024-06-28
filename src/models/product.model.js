const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const productSchema = mongoose.Schema(

    {
        productName : {
            type : String,
            required : true,
            trim : true
        },
        shortDescription : {
            type : String,
            required : true,
            trim : true
        },
        price : {
            type : Number,
            required : true,
        },
        img : {
            type : [String],default : [],  //array of string.
            trim : true
        },
        category : {
            type : String,
            required : true,
            trim : true
        },
        publish : {
            type : Boolean,
            trim : true
        },
        active : {
            type : Boolean,
            trim : true
        }
    }
);

productSchema.plugin(toJSON);
productSchema.plugin(paginate);




const Product = mongoose.model('Product',productSchema);

module.exports = Product;