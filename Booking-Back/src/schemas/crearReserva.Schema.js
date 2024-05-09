const Joi = require("joi");
const id_usuario = Joi.number().integer();
const rol = Joi.string().max(20);
const id_docente = Joi.number().integer();
const id_asignatura = Joi.number().integer();
const id_recurso = Joi.number().integer();
const fecha = Joi.string().max(10).min(10);
const id_bloque = Joi.number().integer();
const reserva_cant = Joi.number().integer();
const fecha_inicio = Joi.string().max(10).min(10);
const fecha_fin = Joi.string().max(10).min(10);
const docente_correo = Joi.string().max(50);
const nrc = Joi.string().max(12).min(1);

const crearReservaSchema = Joi.object({
  id_usuario: id_usuario.required(),
  rol: rol.required(),
  id_docente: id_docente.required(),
  id_asignatura: id_asignatura.required(),
  id_recurso: id_recurso.required(),
  fecha: fecha.required(),
  id_bloque: id_bloque.required(),
  reserva_cant: reserva_cant.required(),
  nrc:nrc.required(),
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
const enviarCredencialesSchema = Joi.object({
  id_docente: id_docente.required(),
  id_asignatura: id_asignatura.required(),
  id_recurso: id_recurso.required(),
  id_bloque: id_bloque.required(),
  fecha: fecha.required(),
  docente_correo: docente_correo.required(),
  nrc:nrc.required(),
});
const listardisponibilidadCalendario = Joi.object({
  id_recurso: id_recurso.required()
});

const generarReservaGeneralShema = Joi.object({
  id_usuario : id_usuario.required(),
  id_recurso:id_recurso.required(),
  fecha : fecha.required(),

})
module.exports = {
  generarReservaGeneralShema,
  listardisponibilidadCalendario,
  enviarCredencialesSchema,
  crearReservaSchema,
  listarcursoSchema,
  listarrecursoSchema,
  filtrardisponibilidadSchema
};
