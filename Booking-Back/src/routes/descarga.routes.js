const { error } = require('console');
const express = require('express');
const router = express.Router();
const path = require('path');

router.get(
    '/credcaseone/',(req,res)=>{
        const nombreArchivo = 'credenciales_ejemplo.csv'
        const rutaArchivo = path.join('src/shared',nombreArchivo)
        res.download(rutaArchivo,(error)=>{
            if (error) {
                console.error('Error al descargar el archivo:', error);
                res.status(500).send('Error al descargar el archivo');
            }
        })
    }
)

module.exports = router