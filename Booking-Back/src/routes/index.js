const express = require('express');
const crearReservaRoute = require('./crearReserva.routes');
const usuarioRoute = require('./usuario.routes')
const listarReserva = require('./listarReserva.routes')

function routerApi(app){
  const route = express.Router();
  app.use(express.json());
  app.use('/api/v1', route);

  route.use('/listar', listarReserva);
  route.use('/reserva', crearReservaRoute);
  route.use('/usuario',usuarioRoute)
}
module.exports = routerApi;
