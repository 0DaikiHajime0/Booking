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
module.exports = router