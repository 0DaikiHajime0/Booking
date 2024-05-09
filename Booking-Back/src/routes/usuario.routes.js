const express = require('express');
const UsuarioService = require('../services/usuario.service');
const router = express.Router();
const usuarioservice = new UsuarioService();

router.get('/verificar/:correo',
    async (req, res, next) => {
        try {
            const { correo } = req.params; 
            const result = await usuarioservice.verificarUsuario(correo);
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
router.get('/obtenerusuario/:correo',
    async(req,res,next) =>{
        try {
            const correo = req.params.correo;
            const [result] = await usuarioservice.obtenerUsuario(correo)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
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
router.post('/verifytok',
    async(req,res,next)=>{
        try {
            const jwtoken = req.body.token;
            const result = await usuarioservice.verificarRol(jwtoken);
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router;
