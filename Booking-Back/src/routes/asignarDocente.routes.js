const express = require('express');
const AsignarDocenteService = require('./../services/asignarDocente.service')
const {asignarDocenteSchema,CursosNoAsignadosSchema,EditarAsignacionSchema} = require('./../schemas/asignarDocente');
const { listarcursoSchema } = require('../schemas/crearReserva.Schema');

const router = express.Router();
const service = new AsignarDocenteService();

router.post('/asignardocente',async(req,res, next)=>{
  try{
    const {error,value} = asignarDocenteSchema.validate(req.body);
    if(error){
      throw new Error(error.details[0].message)
    }
    const [result] = await service.asignarDocente(value)
    res.json(result[0])
  }
  catch (error) {
    next(error);
  }
})
router.get('/listarcursosnoasignados/', async (req, res, next) => {
  try {
    const [result] = await service.CursosNoAsignados();
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});
router.post('/editarasignacion/',async (req,res,next)=>{
  try{
    const {error,value} = EditarAsignacionSchema.validate(req.body);
    if(error){
      throw new Error(error.details[0].message)
    }
    const [result] = await service.editarAsignacion(value);
    res.json(result[0]);
  }
  catch(error){
    next(error)
  }
})

router.get('/listarcursodocente/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await listarcursoSchema.validateAsync({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.listarDocenteCurso([id]);
    res.json(result);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
