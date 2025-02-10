const { error } = require('console');
const express = require('express');
const router = express.Router();
const path = require('path');

/**
 * @openapi
 * paths:
 *   /api/v1/auth/credcaseone/:
 *     get:
 *       summary: Descargar un archivo CSV de ejemplo
 *       description: Este endpoint permite descargar un archivo CSV llamado `credenciales_ejemplo.csv` desde el servidor.
 *       tags:
 *         - Descargas
 *       responses:
 *         '200':
 *           description: Archivo descargado con éxito
 *           content: 
 *             application/octet-stream: 
 *               schema: 
 *                 type: string
 *                 format: binary
 *         '500':
 *           description: Error al descargar al archivo
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Error al descargar el archivo"
 * 
 * */
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