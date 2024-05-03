const express = require('express');
const CrearReservaService = require('./../services/crearReserva.service');
const {generarReservaGeneralShema,listardisponibilidadCalendario, crearReservaSchema,listarcursoSchema,listarrecursoSchema,filtrardisponibilidadSchema,enviarCredencialesSchema } = require('../schemas/crearReserva.Schema');

const router = express.Router();
const service = new CrearReservaService();

router.post('/disponibilidad', async (req, res, next) => {
  try{
    const { error, value } = filtrardisponibilidadSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const result = await service.findDisplonibilidad(value);
    res.json(result);
  }catch (error) {
    next(error);
  }
});

router.post('/crear', async (req, res, next) => {
  try {
    const { error, value } = crearReservaSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.create(value);
    res.json(result[0][0]);
  } catch (error) {
    next(error);
  }
});

router.get('/listarcurso/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = listarcursoSchema.validate({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.findCurso(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/listarrecurso/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = listarrecursoSchema.validate({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.findRecurso(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.get('/listarbloque', async (req, res, next) => {
  try {
    const [result] = await service.findBloque();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/enviarcredenciales',async (req, res, next) => {
  try {
    const { error, value } = enviarCredencialesSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const result= await service.enviarcredencial(value);
    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.post('/descargarcredenciales', async (req, res, next) => {
  try {
    const { error, value } = listarCredencialesSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const credenciales = await service.listarCredenciales(value);
    const buffer = await service.generarArchivoExcel(credenciales);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=credenciales.xlsx');
    res.send(buffer);
  } catch (error) {
    next(error);
  }
});
router.get('/listardisponibilidadcalendar/:id_recurso',async (req, res, next) => {
  try {
    const {id_recurso} = req.params;
    const {error} = listardisponibilidadCalendario.validate({id_recurso});
    if(error){
      throw new Error(error.details[0].message);
    }
    const [result] = await service.listardisponibilidadCalendario(id_recurso);
    res.json(result[0]);
  } catch (error) {
    next(error);
  }
});
router.get('/listardocente',async (req, res, next) => {
  const [result] = await service.listarDocente();
  res.json(result[0]);
});

router.get('/reservageneral',async(req,res,next) =>{
  try {
    const { error, value } = generarReservaGeneralShema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const [result] = await service.generarReservaGeneral(value);
    res.json(result[0][0]);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
