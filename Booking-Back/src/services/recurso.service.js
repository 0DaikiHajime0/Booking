const mysqlLib = require('../../libs/mysql');
class RecursoService{
    constructor(){}

    async mostrarRecursos(){
        const result = await mysqlLib.execute('CALL sp_mostrar_recursos()')
        const recursos = result[0][0]
        if(recursos == null){
            return 'No hay recursos existentes'
        }
        return recursos
    }
}
module.exports = RecursoService;