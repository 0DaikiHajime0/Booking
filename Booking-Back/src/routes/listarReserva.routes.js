const express = require('express');
const ListarReservaService = require('./../services/listarReserva.service');
const { listarReservaSchema, listarReservaAdministradorSchema } = require('../schemas/listarReserva.Schema');

const router = express.Router();
const service = new ListarReservaService();

router.post('/reservadocente', async (req, res, next) => {
  try {
    const { error, value } = listarReservaSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.listarRecurso(value);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }

});
router.post('/reservaadministrador', async (req, res, next) => {
  try {
    const { error, value } = listarReservaAdministradorSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.listarRecursoAdministrador(value);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

