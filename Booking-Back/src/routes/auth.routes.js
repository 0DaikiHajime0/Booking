const express = require('express');
const UsuarioService = require('../services/usuario.service');
const AuthService = require('../services/auth.service');
const router = express.Router();
const authService = new AuthService();

/**
 * @openapi
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         usuario_id:
 *           type: integer
 *           description: ID
 *         usuario_nombres:
 *           type: string
 *           description: Nombre
 *         usuario_apellidos:
 *           type: string
 *           description: Apellido
 *         usuario_correo:
 *           type: string
 *           description: Correo
 *         usuario_rol:
 *           type: string
 *           description: Rol de Usuario
 *         usuario_estado:
 *           type: string
 *           description: Estado
 *       requires:
 *         - usuario_id
 *       example:
 *         usuario_id: 26
 *         usuario_nombres: "Joselin Gianella"
 *         usuario_apellidos: "Arancibia Sedano"
 *         usuario_correo: "jarancibia@continental.edu.pe"
 *         usuario_rol: "Docente"
 *         usuario_estado: "Activo"
 */

/**
 * @openapi
 *   /api/v1/auth/verificar/{correo}:
 *     get:
 *       summary: Verificar usuario por correo
 *       description: Verifica si un usuario existe en la base de datos utilizando su correo electrónico.
 *       tags:
 *         - Auth
 *       parameters:
 *         - name: correo
 *           in: path
 *           required: true
 *           description: Correo electrónico del usuario a verificar.
 *           schema:
 *             type: string
 *             format: email
 *             example: "jarancibia@continental.edu.pe"
 *       responses:
 *         200:
 *           description: Información del Recurso obtenido exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                   $ref: '#/components/schemas/auth'
 *         500:
 *           description: Error interno del servidor.
 */
router.get('/verificar/:correo',
    async (req, res, next) => {
        try {
            const { correo } = req.params; 
            const result = await authService.verificarUsuario(correo);
            if (!result) {
                return res.status(404).json({ mensaje: "Usuario no encontrado" });
            }
            res.json(result);
        } catch (error) {
            if (error.message === 'El usuario no se encuentra') {
                return res.status(404).json({ mensaje: error.message });
            } else if (error.message === 'Error en la consulta SQL') {
                return res.status(500).json({ mensaje: error.message });
            } else {
                next(error);
            }
        }
    }
);
/**
 * @openapi
 *   /api/v1/auth/verifytok:
 *     post:
 *       summary: Verificar token JWT y rol del usuario
 *       description: Este endpoint verifica un token JWT enviado en el cuerpo de la solicitud y valida el rol del usuario asociado.
 *       tags:
 *         - Auth
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT que se verificará.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       responses:
 *         200:
 *           description: Token verificado con éxito.
 *         400:
 *           description: Error en la solicitud.
 *         500:
 *           description: Error interno del servidor.
 */
router.post('/verifytok',
    async(req,res,next)=>{
        try {
            const jwtoken = req.body.token;
            const result = await authService.verificarRol(jwtoken);
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
router.get('/obtenerusuario/:correo',
    async(req,res,next) =>{
        try {
            const correo = req.params.correo;
            const [result] = await authService.obtenerUsuario(correo)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
module.exports = router;
