const express = require('express');
const CrearReservaService = require('./../services/crearReserva.service');
const { crearReservaSchema } = require('../schemas/crearReserva.Schema');

const router = express.Router();
const service = new CrearReservaService();

router.post('/crear', async (req, res, next) => {
  try {
    const { error, value } = crearReservaSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const result = await service.create(value);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/listarcurso/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await service.find(id);
    res.json([result]);
  } catch (error) {
    next(error);
  }
})

router.get('/listarrecurso/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await service.find(id);
    res.json([result]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
