const express = require('express');
const AsignarDocenteService = require('./../services/asignarDocente.service');
const { asignarDocenteSchema, EditarAsignacionSchema } = require('./../schemas/asignarDocente');
const { listarcursoSchema } = require('../schemas/crearReserva.Schema');

const router = express.Router();
const service = new AsignarDocenteService();

// Asignar Docente
/**
 * @openapi
 * components:
 *   schemas:
 *     asignardocente:
 *       type: object
 *       properties:
 *         cantidad_alumnos:
 *           type: integer
 *           description: Cantidad de alumnos
 *         id_curso:
 *           type: integer
 *           description: ID del curso
 *         id_docente:
 *           type: integer
 *           description: ID del docente
 *         nrc_anterior:
 *           type: string
 *           description: nrc anterior del curso 
 *         nrc_curso:
 *           type: string
 *           description: nrc del curso 
 *         modalida_curso:
 *           type: string
 *           description: modalidad del curso 
 *         campus_curso:
 *           type: string
 *           description: campus del curso 
 *         periodo_curso:
 *           type: string
 *           description: periodo del curso 
 *         horario_curso:
 *           type: string
 *           description: horario del curso
 *         tipo_curso:
 *           type: string
 *           description: tipo de curso
 *         curso_inicio:
 *           type: string
 *           format: date
 *           description: curso inicio
 *         curso_fin:
 *           type: string
 *           format: date
 *           description: curso fin
 *       requires:
 *         - id_docente
 *         - id_curso
 *       example:
 *         cantidad_alumnos: 50
 *         id_curso: 1
 *         id_docente: 1
 *         nrc_anterior: "ABC123"
 *         nrc_curso: "NRC001"
 *         modalida_curso: Presencial
 *         campus_curso: "Main Campus"
 *         periodo_curso: "2024-2025"
 *         horario_curso: "Lunes 10:00-12:00"
 *         tipo_curso: "Teoría"
 *         curso_inicio: "2024-01-10"
 *         curso_fin: "2024-05-20"
 */

/**
 * @openapi
 *   /api/v1/asignar/listarcurso/{id}:
 *     get:
 *       summary: Listar curso por ID
 *       description: Permite obtener la información detallada de un curso específico utilizando su ID.
 *       tags:
 *         - Asignar Docente
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID del curso
 *       responses:
 *         200:
 *           description: Información del Recurso obtenido exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/asignardocente'
 *         404:
 *           description: ID no encontrado
 *         500:
 *           description: Error interno del servidor.
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
 * @openapi
 *   /api/v1/asignar/asignardocente:
 *     post:
 *       summary: Asignar un docente a un curso
 *       description: Permite asignar un docente a un curso utilizando la información proporcionada en el cuerpo de la solicitud.
 *       tags:
 *         - Asignar Docente
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/asignardocente'
 *       responses:
 *         200:
 *           description: Docente asignado exitosamente al curso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/asignardocente'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
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
 * @openapi
 *   /api/v1/asignar/listarcursosnoasignados:
 *     get:
 *       summary: Listar cursos no asignados
 *       description: Devuelve una lista de los cursos que no han sido asignados a ningún docente.
 *       tags:
 *         - Asignar Docente
 *       responses:
 *         200:
 *           description: Lista de cursos no asignados obtenida exitosamente.
 *         404:
 *           description: no encontrado
 *         500:
 *           description: Error interno del servidor.
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
 * @openapi
 *   /api/v1/asignar/editarasignacion:
 *     post:
 *       summary: Editar asignación de un docente a un curso
 *       description: Permite editar la asignación de un docente a un curso utilizando la información proporcionada en el cuerpo de la solicitud
 *       tags:
 *         - Asignar Docente
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/asignardocente'
 *             example:
 *               cantidad_alumnos: 50
 *               id_curso: 1
 *               id_docente: 1
 *               nrc_anterior: "ABC123"
 *               nrc_curso: "NRC003"
 *               modalidad_curso: Presencial
 *               campus_curso: "Main Campus"
 *               periodo_curso: "2024-2025"
 *               curso_inicio: "2024-01-10"
 *               curso_fin: "2024-05-20"
 *       responses:
 *         200:
 *           description: Asignación editada exitosamente.
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
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
 * @openapi
 *   /api/v1/asignar/listarcursodocente/{id}:
 *     get:
 *       summary: Listar cursos asignados a un docente
 *       description: Devuelve una lista de cursos asignados a un docente específico, identificado por su ID.
 *       tags:
 *         - Asignar Docente
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID del Docente
 *       responses:
 *         200:
 *           description: Lista de cursos asignados al docente obtenida exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                   $ref: '#/components/schemas/asignardocente'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
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


