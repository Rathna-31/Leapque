const mongoose = require('mongoose');
const {
    toJSON,
    paginate
  } = require('./plugins');

const customerSchema = mongoose.Schema(
    {
        customerId : {
            type : String,
            unique : true,
            required : true,
            trim : true
        },
        firstName : {

            type : String,
            required : true,
            trim : true
        },
        lastName : {
            type : String,
            required : true,
            trim : true
        },
        mobile : {
            type : Number,
            require : true,
            trim : true
        },
        email :{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
             },
        channels : {
            type : String,
            trim : true
        },
        fcmToken : {
            type : String,
            trim : true
        }

        // complete address(coordinates :  lati and longi )
        // address model [customer ID , coordinates , Tag[home/office]]
        //add customer , edit customer , add and edit address
}
);

customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);

const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;