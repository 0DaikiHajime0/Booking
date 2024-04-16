const Joi = require("joi");

const id_usuario = Joi.number().integer();
const rol = Joi.string().max(20);
const id_docente = Joi.number().integer();
const id_asignatura = Joi.number().integer();
const id_recurso = Joi.number().integer();
const fecha = Joi.date();
const id_bloque = Joi.number().integer();
const reserva_cant = Joi.number().integer();

const crearReservaSchema = Joi.object({
  id_usuario: id_usuario.required(),
  rol: rol.required(),
  id_docente: id_docente.required(),
  id_asignatura: id_asignatura.required(),
  id_recurso: id_recurso.required(),
  fecha: fecha.required(),
  id_bloque: id_bloque.required(),
  reserva_cant: reserva_cant.required(),
});

const listarcursoSchema = Joi.object({
  id: Joi.number().required(),
});

const listarrecursoSchema = Joi.object({
  id: Joi.number().required(),
});
const filtrardisponibilidadSchema = Joi.object({
  id_recurso: Joi.number().required(),
  id_bloque: Joi.number().required(),
  fecha: Joi.date().required(),
});
const listarCredencialesSchema = Joi.object({
  id_docente: id_docente.required(),
  id_asignatura: id_asignatura.required(),
  id_recurso: id_recurso.required(),
  id_bloque: id_bloque.required(),
  fecha: fecha.required(),
});




module.exports = {
  listarCredencialesSchema,
  crearReservaSchema,
  listarcursoSchema,
  listarrecursoSchema,
  filtrardisponibilidadSchema
};
