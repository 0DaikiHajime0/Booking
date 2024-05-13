const express = require('express')
const RecursoService = require('../services/recurso.service')
const router = express.Router()
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const recursoservice = new RecursoService();
const upload = multer({ dest: 'uploads/' });
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
router.get('/obtenerLicencias/:recurso_id',
    async(req,res,next)=>{
        const recurso_id = req.params.recurso_id
        try {
            const result = await recursoservice.obtenerLicencias(recurso_id)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
router.post('/nuevaLicencia/:recurso_id',
    async(req,res,next)=>{
        const recurso_id = req.params.recurso_id
        const licencia = req.body
        try {
            const result = await recursoservice.nuevaLicencia(recurso_id,licencia)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
router.get('/obtenerasignaturas',
    async(req, res, next)=>{
        try {
            const result= await recursoservice.obtenerAsignaturas()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
router.post('/obtenerasignaturasbyasignatura',
    async(req,res,next)=>{
        const asignatura = req.body
        try {
            
            const result = await recursoservice.obtenerasignaturasbyasignatura(asignatura)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
router.post('/subircsvcredenciales',upload.single('file'),
    (req,res)=>{
        const file = file.path
        if (!file) {
            return res.status(400).json({ error: 'No se ha proporcionado ningún archivo CSV' });
          }
        const results = [];
        fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
            // Aquí puedes procesar los datos del CSV (en results)
            // Insertarlos en tu base de datos, etc.
            console.log(results);
            res.status(200).json({ message: 'CSV subido y procesado con éxito' });
            });
    }
)
module.exports = router