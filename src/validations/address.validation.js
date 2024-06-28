const Joi = require('joi');

const customerIdValidation = {

  query: Joi.object().keys({
    id: Joi.string()
  })
}

const addAddress = {

  body: Joi.object().keys({
    customerId: Joi.string().required(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    postalCode: Joi.number(),
    coordinates: {
      latitude: Joi.number(),
      longitude: Joi.number()
    },
    tag: Joi.string()

  })

}

const addressUpdateValidation = {

  body: Joi.object().keys({

      address: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      postalCode: Joi.number(),
      coordinates: {
        latitude: Joi.number(),
        longitude: Joi.number()
      },
      tag: Joi.string()
    


  }),

  query: Joi.object().keys({
    customerId: Joi.string().required()
  })

}

const deleteAddress = {

  query: Joi.object().keys({
    customerId: Joi.string().required()
  })
}

module.exports = {
  customerIdValidation,
  addAddress,
  addressUpdateValidation,
  deleteAddress
}
