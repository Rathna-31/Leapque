const mongoose = require('mongoose');
const {
    toJSON,
    paginate
  } = require('./plugins');

const customerLogSchema = mongoose.Schema(
    {
        customerId : {
            type: String,
            required: true,
            trim: true
        }, 
       channel : {
          type: String,
          required: true,
          trim: true
       },
      orderPlaced : {

       type : Boolean,
       required : true,
       trim : true
    },
    callPurpose : {
       
       type : String,
       required : true,
       trim : true
    },
    remainingTime : {
        
        type: Date,
        required: true,
        trim: true
    },



    },
)

customerLogSchema.plugin(toJSON);
customerLogSchema.plugin(paginate);

const CustomerLog = mongoose.model('CustomerLog', customerLogSchema);

module.exports = CustomerLog;


