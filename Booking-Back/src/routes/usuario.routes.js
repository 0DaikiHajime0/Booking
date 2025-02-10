const express = require('express');
const UsuarioService = require('../services/usuario.service');
const router = express.Router();
const usuarioservice = new UsuarioService();

// Usuario
/**
 * @openapi
 * components:
 *   schemas:
 *     usuario:
 *       type: object
 *       properties:
 *         usuario_id:
 *           type: integer
 *           description: ID
 *         usuario_nombres:
 *           type: string
 *           description: Nombres
 *         usuario_apellidos:
 *           type: string
 *           description: Apellidos
 *         usuario_correo:
 *           type: string
 *           description: Correo
 *         usuario_rol:
 *           type: string
 *           description: Rol del usuario
 *         usuario_estado:
 *           type: string
 *           description: Estado del usuario
 *       requires:
 *         - usuario_id
 *       example:
 *         usuario_id: 1
 *         usuario_nombres: "Joselin Gianella"
 *         usuario_apellidos: "Arancibia Sedano"
 *         usuario_correo: "jarancibia@continental.edu.pe"
 *         usuario_rol: "Administrador"
 *         usuario_estado: "Activo"
 */

/**
 * @openapi
 *   /api/v1/usuario/actualizarusuario:
 *     post:
 *       summary: Actualizar usuario
 *       description: Actualizar los nombres y apellidos de un usuario basandose en su correo
 *       tags:
 *         - Usuario
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/usuario'
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
router.post('/actualizarusuario',
    async (req, res, next) => {
        try {
            const { usuario_nombres, usuario_apellidos, usuario_correo } = req.body;
            const result = await usuarioservice.actualizarUsuario(usuario_nombres, usuario_apellidos, usuario_correo);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @openapi
 *   /api/v1/usuario/mostrarusuarios:
 *     get:
 *       summary: Mostrar la lista de Usuarios
 *       description: Muestra todos los usuarios registrados
 *       tags:
 *         - Usuario
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/bloques'
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/mostrarusuarios',
    async(req,res,next)=>{
        try {
            const result = await usuarioservice.mostrarUsuarios();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }    
)

/**
 * @openapi
 *   /api/v1/usuario/editarusuario/{usuario_id}:
 *     put:
 *       summary: Editar usuario
 *       description: Editar la información de un usuario 
 *       tags:
 *         - Usuario
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/usuario'
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/usuario'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.put('/editarusuario/:usuario_id',
    async (req, res, next) => {
        try {
            const usuario = req.body; 
            const usuarioId = req.params.usuario_id; 
            const result = await usuarioservice.editarUsuario(usuarioId, usuario); 
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @openapi
 *   /api/v1/usuario/deshabilitarusuario/{usuario_id}:
 *     get:
 *       summary: Deshabilitar Usuario por ID
 *       description: Deshabilitar Usuario por ID
 *       tags:
 *         - Usuario
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del usuario
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/usuario'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/deshabilitarusuario/:usuario_id',
    async (req,res,next) =>{
        try {
            const usuario_id = req.params.usuario_id;
            const [result] = await usuarioservice.deshabilitarUsuario(usuario_id);
            res.json(result);
        } catch (error) {
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/usuario/habilitarusuario/{usuario_id}:
 *     get:
 *       summary: Habilitar Usuario por ID
 *       description: Habilitar Usuario por ID
 *       tags:
 *         - Usuario
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID del usuario
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/usuario'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/habilitarusuario/:usuario_id',
    async (req,res,next) =>{
        try {
            const usuario_id = req.params.usuario_id;
            const [result] = await usuarioservice.habilitarUsuario(usuario_id);
            res.json(result);
        } catch (error) {
            next(error)
        }
    }
)

/**
 * @openapi
 *   /api/v1/usuario/nuevousuario:
 *     post:
 *       summary: Crear un usuario
 *       description: Crear un usuario
 *       tags:
 *         - Usuario
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/usuario'
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/usuario'
 *         400:
 *           description: Error en la validación del ID.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/nuevousuario',
    async(req,res,next)=>{
        try {
            const usuario = req.body;
            const result = await usuarioservice.nuevoUsuario(usuario);
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router;
