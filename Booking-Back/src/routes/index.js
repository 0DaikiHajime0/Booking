const express = require('express');
const listarreservaRoute = require('./listarreservaRoute');

function routerApi(app){
  const route = express.Router();
  app.use('/api/v1', route);
  route.use('/lista', listarreservaRoute);
}
module.exports = routerApi;
