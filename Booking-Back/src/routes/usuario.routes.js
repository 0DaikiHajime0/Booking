const express = require('express');
const UsuarioService = require('../services/usuario.service');
const router = express.Router();
const usuarioservice = new UsuarioService();

router.get('/verificar/:correo',
    async (req, res, next) => {
        try {
            const { correo } = req.params; 
            const result = await usuarioservice.verificarUsuario(correo);
            res.json(result);
        } catch (error) {
            next(error);
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


module.exports = router;
