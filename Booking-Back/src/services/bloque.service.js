const mysqlLib = require('../../libs/mysql')
class BloquesService{
    constructor(){}
    async obtenerBloques(){
        const result = await mysqlLib.execute('CALL sp_listar_bloques()')
        const bloques = result[0][0]
        if(!bloques){
            return null
        }
    }
    async editarBloque(bloque){
        const result = await mysqlLib.execute('CALL sp_editar_bloque(?,?,?,?)',
        [
            bloque.bloque_id,
            bloque.bloque_nombre,
            bloque.bloque_rango,
            bloque.bloque_orden
        ])
        const res = result[0][0]
        if(!res){
            return null
        }
    }
    async nuevoBloque(bloque){
        const result = await mysqlLib.execute('CALL sp_nuevo_bloque(?,?,?)',
            [
                bloque.bloque_nombre,
                bloque.bloque_rango,
                bloque.bloque_orden
            ])
        const res =result[0][0]
        if(!res){
            return null
        }
            
    }
}
module.exports=BloquesService