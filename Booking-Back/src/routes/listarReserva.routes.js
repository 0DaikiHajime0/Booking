const express = require('express');
const ListarReservaService = require('./../services/listarReserva.service');
const {listarReservaSchema} = require('../schemas/listarReserva.Schema');

const router = express.Router();
const service = new ListarReservaService();

router.post('/reserva-docente', async (req, res, next) => {

  try {
    const { error, value } = listarReservaSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const result = await service.listarRecurso(value);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }

});

