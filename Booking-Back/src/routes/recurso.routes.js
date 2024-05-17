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
router.post('/subircsvcredenciales/:recurso_id', upload.single('file'), (req, res) => {
    const recurso_id = req.params.recurso_id
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No se ha proporcionado ningún archivo CSV' });
    }
    const results = [];
    fs.readFile(file.path, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo CSV' });
        }

        const lines = data.split(/\r?\n/);
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const [usuario, clave, credencial, estado] = line.split(/\s*[;,]\s*/);
            if (usuario !== undefined && clave !== undefined && credencial !== undefined) {
                recursoservice.nuevasLicencias(recurso_id, usuario, clave, credencial, estado)
                    .then((result) => {
                        if (result == null) {
                            return 'no hay respuesta';
                        }
                        results.push({ Usuario: usuario, Contraseña: clave, Credencial: credencial, Estado: estado });
                    })
                    .catch((error) => {
                        console.error('Error en la solicitud:', error);
                    });
            }
        }
        res.status(200).json(results);
    });
});
router.post('/nuevocurso',
    async(req,res,next)=>{
        const objeto = req.body
        try {
            const result = await recursoservice.nuevoCurso(objeto)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)



module.exports = router