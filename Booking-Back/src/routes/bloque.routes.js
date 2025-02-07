const express = require('express');
const BloquesService = require('../services/bloque.service');
const router = express.Router();
const bloqueservice = new BloquesService();

// Bloques
/**
 * @openapi
 * components:
 *   schemas:
 *     bloques:
 *       type: object
 *       properties:
 *         bloque_id:
 *           type: integer
 *           description: ID
 *         bloque_nombre:
 *           type: string
 *           description: Nombre del bloque
 *         bloque_rango:
 *           type: string
 *           description: Rango del bloque
 *         bloque_orden:
 *           type: integer
 *           description: Orden del bloque
 *       requires:
 *         - bloque_id
 *       example:
 *         bloque_id: 50
 *         bloque_nombre: "Bloque I"
 *         bloque_rango: "07:00:00 - 08:30:00"
 *         bloque_orden: 4
 * 
 */


router.get('/listar', // No retorna datos
    async (req,res,next) =>{
        try {
            const result = await bloqueservice.obtenerBloques();
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)
/**
 * @openapi
 *   /api/v1/bloque/editarbloque:
 *     post:
 *       summary: Editar bloque
 *       description: Permite editar la información de un bloque.
 *       tags:
 *         - Bloques
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               $ref: '#/components/schemas/bloques'
 *       responses:
 *         200:
 *           description: Bloque editado exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                   $ref: '#/components/schemas/bloques'
 *         500:
 *           description: Error interno del servidor.
 */
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

/**
 * @openapi
 *   /api/v1/bloque/nuevobloque:
 *     post:
 *       summary: Nuevo bloque
 *       description: Crear un nuevo bloque
 *       tags:
 *         - Bloques
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               $ref: '#/components/schemas/bloques'
 *       responses:
 *         200:
 *           description: Bloque editado exitosamente.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                   $ref: '#/components/schemas/bloques'
 *         500:
 *           description: Error interno del servidor.
 */
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