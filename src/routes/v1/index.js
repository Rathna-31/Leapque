const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const productRoute = require('./product.route');
const uploadRoute = require('./upload.route');
const orderRoute = require('./order.route');
const customerRoute = require('./customer.route');
const nylasRoute = require('./nylas.route');
const GcalendarRoute = require('./Gcalendar.route');
const config = require('../../config/config');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path: '/customer',
    route: customerRoute,
  },
  {
    path: '/nylas',
    route: nylasRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
