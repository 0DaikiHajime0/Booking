const express = require('express');
const CrearReservaService = require('./../services/crearReserva.service');
const { crearReservaSchema,listarcursoSchema,listarrecursoSchema,filtrardisponibilidadSchema,listarCredencialesSchema } = require('../schemas/crearReserva.Schema');

const router = express.Router();
const service = new CrearReservaService();

router.get('/disponibilidad', async (req, res, next) => {
  try{
    const { error, value } = filtrardisponibilidadSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const result = await service.findDisplonibilidad(value);
    res.json(result);
  }catch (error) {
    next(error);
  }
});

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
    const { error } = listarcursoSchema.validate({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.findCurso(id);
    res.json([result]);
  } catch (error) {
    next(error);
  }
});

router.get('/listarrecurso/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = listarrecursoSchema.validate({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.findRecurso(id);
    res.json([result]);
  } catch (error) {
    next(error);
  }
});

router.get('/listarbloque', async (req, res, next) => {
  try {
    const [result] = await service.findBloque();
    res.json([result]);
  } catch (error) {
    next(error);
  }
});
router.get('/enviarcorreo', async (req, res, next) => {
  try {
      const data = {
      };
      await service.SendMail(data);

      res.json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
      next(error);
  }
});
router.get('/listarcredenciales',async (req, res, next) => {
  try {
    const { error, value } = listarCredencialesSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.listarCredenciales(value);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});
router.get('/listarfechacredenciales',async (req, res, next) => {
  try {
    const { error, value } = listarCredencialesSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.listarFecha(value);
    res.json(result[0][0]);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
