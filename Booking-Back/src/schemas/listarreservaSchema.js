const Joi = require('joi');

const id = Joi.number().integer();

const getReservaSchema = Joi.object( {
  reseva_id: id.required()
});


module.exports = {getReservaSchema};
