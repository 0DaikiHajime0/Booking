const Joi = require("joi");
const cantidad_alumnos = Joi.number().integer().allow(null);
const id_curso = Joi.number().integer().allow(null);
const id_docente = Joi.number().integer().allow(null);
const nrc_curso = Joi.string().min(4).allow(null);
const modalida_curso= Joi.string().min(4).allow(null);
const campus_curso= Joi.string().min(4).allow(null);
const periodo_curso= Joi.string().min(4).allow(null);
const horario_curso = Joi.string().min(4).allow(null);
const tipo_curso= Joi.string().min(4).allow(null);

const asignarDocenteSchema = Joi.object({

     cantidad_alumnos: cantidad_alumnos.required(),
     id_curso : id_curso.required(),
     id_docente: id_docente.required(),
     nrc_curso:nrc_curso.required(),
     modalida_curso:modalida_curso.required(),
     campus_curso: campus_curso.required(),
     periodo_curso:periodo_curso.required(),
     horario_curso:horario_curso,
     tipo_curso:tipo_curso,
})
const CursosNoAsignadosSchema = Joi.object({
  id: Joi.number().required(),
})
const EditarAsignacionSchema = Joi.object({
    id_curso: id_curso.required(),
     id_docente: id_docente.required(),
     nrc_anterior: nrc_curso.required(),
     cantidad_alumnos: cantidad_alumnos.required(),
     nrc_curso: nrc_curso.required(),
     periodo_curso: periodo_curso.required(),
     campus_curso: campus_curso.required(),
     modalidad_curso: modalida_curso.required()

})
module.exports = {asignarDocenteSchema,CursosNoAsignadosSchema,EditarAsignacionSchema}


