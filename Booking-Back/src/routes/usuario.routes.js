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

module.exports = router;