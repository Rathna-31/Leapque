const Joi = require('joi');

const addOrder = {

  body: Joi.object().keys(

    {
      orderNumber: Joi.string(),
      status: {

        status: Joi.string(),
        time: Joi.date().iso(),
      },
      customerName: Joi.string(),
      customerId: Joi.string(),
      channel: Joi.string().required(),
      products: Joi.array().items({
        productId: Joi.string().required(),
        name: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
      payment: {
        type: Joi.string().required(),
        transaction: Joi.string(),
        amount: Joi.number().required(),
      },
      delivery: {
        mode: Joi.string().required(),
        deliverTime: Joi.date().iso(),
      },
      address: {

        address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        postalCode: Joi.string(),
        coordinates: {
          latitude: Joi.number(),
          longitude: Joi.number()
        },
        tag: Joi.string()
      },
      orderComment: Joi.string(),
      coupon: Joi.string(),
      discount: Joi.number(),
      orderedTime: Joi.date().iso()

    }
  )
}

const orderIdValidation = {

  query: Joi.object().keys({
    orderNo: Joi.string()
  })
}

const deleteOrder = {

  query: Joi.object().keys({
    orderId: Joi.string().required()
  })

}

const updateProduct = {

  query: Joi.object().keys({
    orderId: Joi.string().required(),
    productId: Joi.string().required(),
    qty: Joi.number().required()
  })
}

const addProduct = {

  body: Joi.object().keys({
    productId: Joi.string().required(),
    name: Joi.string().required(),
    quantity: Joi.number().required()
  }),

  query: Joi.object().keys({
    orderId: Joi.string().required()
  })

}


module.exports = {
  addOrder,
  orderIdValidation,
  deleteOrder,
  updateProduct,
  addProduct
}
