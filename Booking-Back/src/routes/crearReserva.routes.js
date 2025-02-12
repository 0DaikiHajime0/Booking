const express = require('express');
const CrearReservaService = require('./../services/crearReserva.service');
const {generarReservaGeneralShema,listardisponibilidadCalendario, crearReservaSchema,listarcursoSchema,listarrecursoSchema,filtrardisponibilidadSchema,enviarCredencialesSchema } = require('../schemas/crearReserva.Schema');

const router = express.Router();
const service = new CrearReservaService();
// Crear Reserva
/**
 * 
 * @openapi
 * components:
 *   schemas:
 *     crearreserva:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           description: ID del USuario
 *         rol:
 *           type: string
 *           description: Rol
 *         id_docente:
 *           type: integer
 *           description: ID Docente
 *         id_asignatura:
 *           type: integer
 *           description: ID Asignatura
 *         id_recurso:
 *           type: integer
 *           description: ID Recurso
 *         fecha:
 *           type: string
 *           format: date
 *           description: fecha
 *         id_bloque:
 *           type: integer
 *           description: ID Bloque
 *         reserva_cant:
 *           type: integer
 *           description: Cantidad de reserva 
 *         nrc:
 *           type: string
 *           description: NRC del Curso 
 *       requires:
 *         - id_usuario
 *         - rol
 *         - id_docente
 *         - id_asignatura
 *         - fecha
 *         - id_bloque
 *         - reserva_cant
 *         - nrc
 *       example:
 *         id_usuario: 1
 *         rol: "Administrador"
 *         id_docente: 2
 *         id_asignatura: 3
 *         id_recurso: 4
 *         fecha: "2024-05-31"
 *         id_bloque: 1
 *         reserva_cant: 5
 *         nrc: "NRC12345"
 */

/**
 * @openapi
 *   /api/v1/reserva/disponibilidad:
 *     post:
 *       summary: Disponibilidad
 *       description: Bloques de tiempo disponibles para ese recurso en la fecha especificada.
 *       tags:
 *         - Crear Reserva
 *       parameters:
 *         - in: path
 *           name: id 
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del recurso
 *       responses:
 *         200:
 *           description: Bloques de tiempo disponible
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/crearreserva'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/disponibilidad', async (req, res, next) => {
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

/**
 * @openapi
 *   /api/v1/reserva/crear:
 *     post:
 *       summary: Realizar reservas 
 *       description: Realizar reservas de recursos educativos
 *       tags:
 *         - Crear Reserva
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/crearreserva'
 *       responses:
 *         200:
 *           description: Reserva de bloque exitoso.
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/crear', async (req, res, next) => {
  try {
    const { error, value } = crearReservaSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.create(value);
    res.json(result[0][0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *   /api/v1/reserva/listarcurso/{id}:
 *     get:
 *       summary: Listar todos los cursos activos 
 *       description: Listar todos los cursos activos asociados a un docente específico
 *       tags:
 *         - Crear Reserva
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del curso
 *       responses:
 *         200:
 *           description: Lista de cursos obtenido exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/crearreserva'
 *         400:
 *           description: Error en la validación del ID.
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
 *   /api/v1/reserva/listarrecurso/{id}:
 *     get:
 *       summary: Listar Recursos por ID
 *       description: Listar recursos asociados a un curso específico
 *       tags:
 *         - Crear Reserva
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del Recurso
 *       responses:
 *         200:
 *           description: Lista de Recursos obtenido exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/crearreserva'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/listarrecurso/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = listarrecursoSchema.validate({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.findRecurso(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *   /api/v1/reserva/listarbloque:
 *     get:
 *       summary: Listar bloques
 *       description: Retorna una lista de bloques disponibles en el sistema.
 *       tags:
 *         - Bloques
 *       responses:
 *         200:
 *           description: Información del Recurso obtenido exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/bloques'
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/listarbloque', async (req, res, next) => {
  try {
    const [result] = await service.findBloque();
    res.json(result);
  } catch (error) {
    next(error);
  }
});


router.post('/enviarcredenciales',async (req, res, next) => {
  try {
    const { error, value } = enviarCredencialesSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const result= await service.enviarcredencial(value);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/descargarcredenciales', async (req, res, next) => {
  try {
    const { error, value } = listarCredencialesSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const credenciales = await service.listarCredenciales(value);
    const buffer = await service.generarArchivoExcel(credenciales);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=credenciales.xlsx');
    res.send(buffer);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *   /api/v1/reserva/listardisponibilidadcalendar/{id_recurso}:
 *     get:
 *       summary: Obtener la cantidad de licencias 
 *       description: Obtener la cantidad de licencias disponibles para un recurso en un calendario
 *       tags:
 *         - Crear Reserva
 *       parameters:
 *         - in: path
 *           name: id_recurso
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del Recurso
 *       responses:
 *         200:
 *           description: Lista de licencias obtenido exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/crearreserva'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/listardisponibilidadcalendar/:id_recurso',async (req, res, next) => {
  try {
    const {id_recurso} = req.params;
    const {error} = listardisponibilidadCalendario.validate({id_recurso});
    if(error){
      throw new Error(error.details[0].message);
    }
    const [result] = await service.listardisponibilidadCalendario(id_recurso);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *   /api/v1/reserva/listardocente:
 *     get:
 *       summary: Listar los usuarios Docente
 *       description: Listar todos los usuarios que tienen el rol de Docente
 *       tags:
 *         - Crear Reserva
 *       responses:
 *         200:
 *           description: Lista de licencias obtenido exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/crearreserva'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/listardocente',async (req, res, next) => {
  const [result] = await service.listarDocente();
  res.json(result[0]);
});

//
/**
 * @openapi
 *   /api/v1/reservageneral:
 *     post:
 *       summary: Realiza reservas para un recurso específico 
 *       description: Reserva todos los bloques de tiempo disponibles para ese recurso en la fecha especificada.
 *       tags:
 *         - Crear Reserva
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/crearreserva'
 *       responses:
 *         200:
 *           description: Reserva de bloque exitoso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                   $ref: '#/components/schemas/crearreserva'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/reservageneral',async(req,res,next) =>{
  try {
    const { error, value } = generarReservaGeneralShema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.generarReservaGeneral(value);
    res.json(result[0][0]);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
 