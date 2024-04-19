const express = require('express');
const listarreservaRoute = require('./listarreservaRoute');
const crearReservaRoute = require('./crearReserva.routes');
const usuarioRoute = require('./usuario.routes')
const recursoRoute = require('./recurso.routes')

function routerApi(app){
  const route = express.Router();
  app.use(express.json());
  app.use('/api/v1', route);

  route.use('/lista', listarreservaRoute);
  route.use('/reserva', crearReservaRoute);
  route.use('/usuario',usuarioRoute);
  route.use('/recurso',recursoRoute)
}
module.exports = routerApi;
