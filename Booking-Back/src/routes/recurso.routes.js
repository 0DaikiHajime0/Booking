const express = require('express')
const RecursoService = require('../services/recurso.service')
const router = express.Router()
const recursoservice = new RecursoService();

router.get('/mostrarrecursos',
    async(req,res,next)=>{
        try {
            const result = await recursoservice.mostrarRecursos()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
router.get('/mostrarasignaturasbyrecurso/:recurso_id',
    async(req,res,next)=>{
        const {recurso_id} = req.params
        try {
            const result = await recursoservice.mostrarAsignaturasByRecurso(recurso_id)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
router.post('/guardarRecurso/',
    async(req,res,next)=>{
        const recurso = req.body
        try{
            const result  = await recursoservice.guardarRecurso(recurso)
            res.json(result)
        }catch(error){
            next(error)
        }
    }
)
router.post('/editarRecurso/',
    async(req,res,next)=>{
        const recurso = req.body
        try{
            const result  = await recursoservice.editarRecurso(recurso)
            res.json(result)
        }catch(error){
            next(error)
        }
    }
)
module.exports = router