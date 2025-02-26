const express = require('express');
const ListarReservaService = require('./../services/listarReserva.service');
const { listarReservaSchema, listarReservaAdministradorSchema } = require('../schemas/listarReserva.Schema');

const router = express.Router();
const service = new ListarReservaService();

// Listar Reserva
/**
 * @openapi
 * components:
 *   schemas:
 *     reserva:
 *       type: object
 *       properties:
 *         id_docente:
 *           type: integer
 *           description: ID del docente
 *         id_bloques:
 *           type: string
 *           description: ID del bloque
 *         fechaReservaInicio:
 *           type: string
 *           description: fecha de inicio del intervalo de reserva 
 *         fechaReservaFin:
 *           type: string
 *           description: fecha de fin del intervalo de reserva 
 *         fechaRegistroInicio:
 *           type: string
 *           description: fecha de inicio del intervalo de registro de reserva 
 *         fechaRegistroFin:
 *           type: string
 *           description: fecha de fin del intervalo de registro de reserva 
 *       requires:
 *         - id_docente
 *       example:
 *         id_docente: 24
 *         id_bloques: null
 *         fechaReservaInicio: null
 *         fechaReservaFin: null
 *         fechaRegistroInicio: null
 *         fechaRegistroFin: null
 */

/**
 * @openapi
 *   /api/v1/listar/reservadocente:
 *     post:
 *       summary: Listar las reservas de recursos por Docente.
 *       description: Listar las reservas de recursos realizadas por un docente específico.
 *       tags:
 *         - Listar Reserva
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/reserva'
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
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

/**
 * @openapi
 *   /api/v1/listar/reservaadministrador:
 *     post:
 *       summary: Listar las reservas de recursos
 *       description: Listar las reservas de recursos, proporcionando flexibilidad en los criterios de búsqueda  
 *       tags:
 *         - Listar Reserva
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/reserva'
 *             example:
 *               id_docente: 24
 *               id_recurso: null
 *               id_bloques: null
 *               fechaReservaInicio: null
 *               fechaReservaFin: null
 *               fechaRegistroInicio: null
 *               fechaRegistroFin: null
 *               estado_reserva: null
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
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

