const express = require('express');
const crearReservaRoute = require('./crearReserva.routes');
const usuarioRoute = require('./usuario.routes')
const listarReserva = require('./listarReserva.routes')
const recursoRoute = require('./recurso.routes')
const asignarDocente = require('./asignarDocente.routes')
const bloqueRoute = require('./bloque.routes')
const verificarToken = require('../../middlewares/auth')
const authRoute =require('../routes/auth.routes')
const descargaRoute = require('../routes/descarga.routes')
function routerApi(app){
  const route = express.Router();
  app.use(express.json());
  app.use('/api/v1', route);
  route.use('/auth',authRoute);
  route.use(verificarToken);
  route.use('/usuario',usuarioRoute);  
  route.use('/listar', listarReserva);
  route.use('/reserva', crearReservaRoute);
  route.use('/recurso',recursoRoute);
  route.use('/asignar',asignarDocente);
  route.use('/bloque',bloqueRoute);
  route.use('/credenciales',descargaRoute)
}
module.exports = routerApi;
