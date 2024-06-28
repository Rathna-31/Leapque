const mongoose = require('mongoose');

const {
    toJSON,
    paginate
  } = require('./plugins');


const addressSchema = mongoose.Schema(
    {
        customerId : {
            type : String,
            unique : true,
            required : true,
            trim : true
        },

        address : {
            type : String,
            required : true,
            trim : true
        },
        city : {
            type : String,
            required : true,
            trim : true
        },
        state : {
            type : String,
            required : true,
            trim : true
        },
        country : {
            type : String,
            required : true,
            trim : true
        },
        postalCode : {
            type : Number,
            required : true,
            trim : true
        },
        coordinates : {
            latitude : {
                type : Number,
            required : true,
            trim : true
            },
            longitude : {
                type : Number,
                required : true,
                trim : true
            }
        },
        tag : {
            type : String,
            required : true,
            trim : true
        }


    }
);


addressSchema.plugin(toJSON);
addressSchema.plugin(paginate);

const Address = mongoose.model('Address',addressSchema);

module.exports = Address;