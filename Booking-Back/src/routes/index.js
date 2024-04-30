const express = require('express');
const crearReservaRoute = require('./crearReserva.routes');
const usuarioRoute = require('./usuario.routes')
const listarReserva = require('./listarReserva.routes')
const recursoRoute = require('./recurso.routes')
const asignarDocente = require('./asignarDocente.routes')
const bloqueRoute = require('./bloque.routes')

function routerApi(app){
  const route = express.Router();
  app.use(express.json());
  app.use('/api/v1', route);

  route.use('/listar', listarReserva);
  route.use('/reserva', crearReservaRoute);
  route.use('/usuario',usuarioRoute);
  route.use('/recurso',recursoRoute);
  route.use('/asignar',asignarDocente);
  route.use('/bloque',bloqueRoute)
}
module.exports = routerApi;
