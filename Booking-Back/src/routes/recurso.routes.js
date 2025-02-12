const express = require('express')
const RecursoService = require('../services/recurso.service')
const router = express.Router()
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const recursoservice = new RecursoService();
const upload = multer({ dest: 'uploads/' });

// Recurso
/**
 * @openapi
 * components:
 *   schemas:
 *     recurso:
 *       type: object
 *       properties:
 *         recurso_id:
 *           type: integer
 *           description: ID del recurso
 *         credencial_usuario:
 *           type: string
 *           description: Credencial de usuario
 *         credencial_contrasena:
 *           type: string
 *           description: Contraseña 
 *         credenciales_estado:
 *           type: string
 *           description: Estado de Credencial 
 *         credencial_tipo:
 *           type: string
 *           description: Tipo de Credencial
 *       requires:
 *         - id_docente
 *       example:
 *         recurso_id: 1
 *         credencial_usuario: "usuario123"
 *         credencial_contrasena: "contrasena123"
 *         credenciales_estado: "key123"
 *         credencial_tipo: "activo"
 */

/**
 * @openapi
 *   /api/v1/recurso/mostrarrecursos:
 *     get:
 *       summary: Mostrar los recursos
 *       description: Mostrar todos los recursos registrados 
 *       tags:
 *         - Recurso
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/recurso'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/mostrarrecursos',
    async(req,res,next)=>{
        try {
            const result = await recursoservice.mostrarRecursos()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/recurso/mostrarasignaturasbyrecurso/{recurso_id}:
 *     get:
 *       summary: Mostrar los recursos por ID
 *       description: Mostrar todos los recursos registrados por ID
 *       tags:
 *         - Recurso
 *       parameters:
 *         - in: path
 *           name: recurso_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: recurso_id
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/mostrarasignaturasbyrecurso/:recurso_id',
    async(req,res,next)=>{
        const {recurso_id} = req.params
        try {
            const result = await recursoservice.mostrarAsignaturasByRecurso(recurso_id)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/recurso/guardarRecurso:
 *     post:
 *       summary: Guardar Recurso 
 *       description: Guardar un nuevo recurso.
 *       tags:
 *         - Recurso
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/crearreserva'
 *       responses:
 *         200:
 *           description: OK
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
router.post('/guardarRecurso/',
    async(req,res,next)=>{
        const recurso = req.body
        try{
            const result  = await recursoservice.guardarRecurso(recurso)
            res.json(result)
        }catch(error){
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/recurso/editarRecurso:
 *     post:
 *       summary: Editar recurso
 *       description: Permite editar el recurso
 *       tags:
 *         - Recurso
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/crearreserva'
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/editarRecurso/',
    async(req,res,next)=>{
        const recurso = req.body
        try{
            const result  = await recursoservice.editarRecurso(recurso)
            res.json(result)
        }catch(error){
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/recurso/obtenerLicencias/{recurso_id}:
 *     get:
 *       summary: Mostrar las Licencias
 *       description: Mostrar las Licencias por ID
 *       tags:
 *         - Recurso
 *       parameters:
 *         - in: path
 *           name: recurso_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del recurso
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/recurso'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/obtenerLicencias/:recurso_id',
    async(req,res,next)=>{
        const recurso_id = req.params.recurso_id
        try {
            const result = await recursoservice.obtenerLicencias(recurso_id)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/recurso/nuevaLicencia:
 *     post:
 *       summary: Crear Licencia
 *       description: Crear una nueva licencia
 *       tags:
 *         - Recurso
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Recurso'
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/nuevaLicencia',
    async(req,res,next)=>{
        const licencia = req.body
        try {
            const result = await recursoservice.nuevaLicencia(licencia)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/recurso/obtenerasignaturas:
 *     get:
 *       summary: Obtener todas las asignaturas
 *       description: obtener todas las asignaturas almacenadas en la tabla curso
 *       tags:
 *         - Recurso
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/recurso'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/obtenerasignaturas',
    async(req, res, next)=>{
        try {
            const result= await recursoservice.obtenerAsignaturas()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
/**
 * @openapi
 *   /api/v1/recurso/obtenerasignaturasbyasignatura:
 *     post:
 *       summary: Obtener todas las asignaturas
 *       description: Obtener los registros de la tabla docente_curso por ID curso
 *       tags:
 *         - Recurso
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del curso
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/recurso'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/obtenerasignaturasbyasignatura',
    async(req,res,next)=>{
        const asignatura = req.body
        try {
            
            const result = await recursoservice.obtenerasignaturasbyasignatura(asignatura)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/recurso/subircsvcredenciales/{recurso_id}:
 *     post:
 *       summary: Agregar una nueva licencia
 *       description: Agregar una nueva licencia en la tabla Credenciales
 *       tags:
 *         - Recurso
 *       parameters:
 *         - in: path
 *           name: recurso_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del curso
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/recurso'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/subircsvcredenciales/:recurso_id', upload.single('file'), (req, res) => {
    const recurso_id = req.params.recurso_id
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No se ha proporcionado ningún archivo CSV' });
    }
    const results = [];
    fs.readFile(file.path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo CSV' });
        }

        const lines = data.split(/\r?\n/);
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const [usuario, clave, estado,tipo] = line.split(/\s*[;,]\s*/);
            if (usuario !== undefined && clave !== undefined) {
                recursoservice.nuevasLicencias(recurso_id, usuario, clave, estado, tipo)
                    .then((result) => {
                        if (result == null) {
                            return 'no hay respuesta';
                        }
                        results.push({ Usuario: usuario, Contraseña: clave, Estado: estado, Tipo: tipo });
                    })
                    .catch((error) => {
                        console.error('Error en la solicitud:', error);
                    });
            }
        }
        res.status(200).json(results);
    });
});

/**
 * @openapi
 *   /api/v1/recurso/nuevocurso:
 *     post:
 *       summary: Crear Curso
 *       description: Crear una nuevo curso
 *       tags:
 *         - Recurso
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Recurso'
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/nuevocurso',
    async(req,res,next)=>{
        const objeto = req.body
        try {
            const result = await recursoservice.nuevoCurso(objeto)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
// SP no encontrado
router.post('/asignarlicencias',
    async(req,res,next)=>{
        const asignaciones = req.body
        try {
            const result = await recursoservice.asignarLicencias(asignaciones)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/recurso/editarLicencia:
 *     post:
 *       summary: Editar Licencia
 *       description: Permite editar la licencia
 *       tags:
 *         - Recurso
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Recurso'
 *       responses:
 *         200:
 *           description: OK
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/editarLicencia', async (req, res, next) => {
    const licencia = req.body;
    try {
      const result = await recursoservice.editarLicencia(licencia);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router