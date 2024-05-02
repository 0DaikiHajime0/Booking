const express = require('express');
const BloquesService = require('../services/bloque.service');
const router = express.Router();
const bloqueservice = new BloquesService();

router.get('/listar',
    async (req,res,next) =>{
        try {
            const result = await bloqueservice.obtenerBloques();
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
router.post('/editarbloque',
    async(req,res,next)=>{
        bloque = req.body
        try {
            const result = await bloqueservice.editarBloque(bloque);
            res.json(result)   
        } catch (error) {
            next(error)
        }
    }
)
router.post('/nuevobloque',
    async(req,res,next)=>{
        bloque = req.body
        try {
            const result = await bloqueservice.nuevoBloque(bloque);
            res.json(result)
        } catch (error) {
            next(error)
        }
    }    
)
module.exports=router