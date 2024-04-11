const Joi = require('joi');

const correo = Joi.string();

const getUsuarioSchema = Joi.object(
    {
        usuario_correo:correo.required()
    }
);

module.exports = {getUsuarioSchema};