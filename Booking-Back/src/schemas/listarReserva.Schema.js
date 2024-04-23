const Joi = require("joi");

const id_docente = Joi.number().integer().allow(null);
const id_recurso = Joi.number().integer().allow(null);
const id_bloques = Joi.number().integer().allow(null);
const fechaReservaInicio = Joi.string().max(10).min(10).allow(null);
const fechaReservaFin = Joi.string().max(10).min(10).allow(null);
const fechaRegistroInicio = Joi.string().max(10).min(10).allow(null);
const fechaRegistroFin = Joi.string().max(10).min(10).allow(null);
const estado_reserva = Joi.string().max(10).allow(null);

const listarReservaSchema = Joi.object({
  id_docente: id_docente.required(),
  id_bloques: id_bloques,
  fechaReservaInicio: fechaReservaInicio,
  fechaReservaFin: fechaReservaFin,
  fechaRegistroInicio: fechaRegistroInicio,
  fechaRegistroFin: fechaRegistroFin,
});
const listarReservaAdministradorSchema = Joi.object({
  id_docente: id_docente,
  id_recurso :id_recurso,
  id_bloques: id_bloques,
  fechaReservaInicio: fechaReservaInicio,
  fechaReservaFin: fechaReservaFin,
  fechaRegistroInicio: fechaRegistroInicio,
  fechaRegistroFin: fechaRegistroFin,
  estado_reserva:estado_reserva,
})

module.exports = { listarReservaSchema,listarReservaAdministradorSchema };
