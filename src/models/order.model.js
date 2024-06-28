const mongoose = require('mongoose');
const {
  toJSON,
  paginate
} = require('./plugins');

const orderSchema = mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    trim: true,
    unique : true
  },
  status: {

    status: {
      type: String, // status and time
      required: true,
      trim: true
    },
    time: {
      type: Date,
      required: true
    }
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },             ///AddressID
  customerId: {
    type: String,
    required: true,
    trim: true
  },
  channel: {
    type: String,
    trim: true
  },
  products: {
    type : [{
      
    productId : {
      type: String,
      required: true,
      trim: true
    },
    name: {           
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
    }
  }] ,

  required : true
},
  payment: {
    type: {
      type: String,
      required: true,
      trim: true
    },
    transaction: {
      type: String,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
    }
  },
  delivery: {
    mode: {
      type: String,
      required: true,
      trim: true
    },
    deliverTime: {
      type: Date,

      trim: true
    }
  },
address : {
    address : {
        type : String,
        trim : true
    },
    city : {
        type : String,
        trim : true
    },
    state : {
        type : String,
        trim : true
    },
    country : {
        type : String,
        trim : true
    },
    postalCode : {
        type : String,
        trim : true
    },
    coordinates : {
        latitude : {
            type : Number,
           trim : true
        },
        longitude : {
            type : Number,
            trim : true
        }
    },
    tag : {
      type : String,
      trim : true
    }

  
},
  orderComment: {

    type: String,
    trim: true
  },
  coupon: {
    type: String,
    trim: true
  },
  discount: {
    type: Number,

  },
  orderedTime: {
    type: Date,
    trim: true
  }

  //address field [adddress model]

});

orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
