const express = require('express');
const UsuarioService = require('../services/usuario.service');
const AuthService = require('../services/auth.service');
const router = express.Router();
const authService = new AuthService();
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
