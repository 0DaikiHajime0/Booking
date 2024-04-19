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
    async mostrarAsignaturasByRecurso(recurso_id){
        const result = await mysqlLib.execute('CALL sp_mostrar_asignaturas_by_recurso(?)',[recurso_id])
        const asignaturas = result [0][0]
        if(asignaturas == null){
            return 'No hay asignaturas relacionadas'
        }
        return asignaturas
    }
    async guardarRecurso(recurso){
        const result = await mysqlLib.execute('CALL sp_guardar_recurso(?,?,?,?)',[recurso.recurso_nombre,recurso.recurso_empresa,recurso.recurso_estado,recurso.recurso_cant_credenciales])
        const res = result [0][0]
        if(res == null){
            return 'no hay respuesta'
        }
        return res
    }
    async editarRecurso(recurso){
        const result = await mysqlLib.execute('CALL sp_editar_recurso(?,?,?,?,?)',[recurso.recurso_id,recurso.recurso_nombre,recurso.recurso_empresa,recurso.recurso_estado,recurso.recurso_cant_credenciales])
        const res = result [0][0]
        if(res == null){
            return 'no hay respuesta'
        }
        return res
    }
}
module.exports = RecursoService;