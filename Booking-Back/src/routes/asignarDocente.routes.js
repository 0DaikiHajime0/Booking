const express = require('express');
const AsignarDocenteService = require('./../services/asignarDocente.service');
const { asignarDocenteSchema, EditarAsignacionSchema } = require('./../schemas/asignarDocente');
const { listarcursoSchema } = require('../schemas/crearReserva.Schema');

const router = express.Router();
const service = new AsignarDocenteService();

/**
 * @swagger
 * /listarcurso/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso obtenido exitosamente
 *       400:
 *         description: Error en la validación del ID
 */
router.get('/listarcurso/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = listarcursoSchema.validate({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.findCurso(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /asignardocente:
 *   post:
 *     summary: Asignar un docente a un curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AsignarDocente'
 *     responses:
 *       200:
 *         description: Docente asignado correctamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/asignardocente', async (req, res, next) => {
  try {
    const { error, value } = asignarDocenteSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.asignarDocente(value);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /listarcursosnoasignados:
 *   get:
 *     summary: Listar cursos no asignados
 *     responses:
 *       200:
 *         description: Cursos no asignados obtenidos correctamente
 */
router.get('/listarcursosnoasignados', async (req, res, next) => {
  try {
    const [result] = await service.CursosNoAsignados();
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /editarasignacion:
 *   post:
 *     summary: Editar la asignación de un docente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditarAsignacion'
 *     responses:
 *       200:
 *         description: Asignación editada correctamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/editarasignacion', async (req, res, next) => {
  try {
    const { error, value } = EditarAsignacionSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.editarAsignacion(value);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /listarcursodocente/{id}:
 *   get:
 *     summary: Listar cursos asignados a un docente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del docente
 *     responses:
 *       200:
 *         description: Cursos obtenidos exitosamente
 *       400:
 *         description: Error en la validación del ID
 */
router.get('/listarcursodocente/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await listarcursoSchema.validateAsync({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.listarDocenteCurso([id]);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;


