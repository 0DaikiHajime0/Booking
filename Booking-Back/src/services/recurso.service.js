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
    async obtenerLicencias(recurso_id){
        const result = await mysqlLib.execute('CALL sp_listar_licencias(?)',[recurso_id]);
        const licencias = result[0][0]
        if(licencias==null){
            return 'no hay respuesta'
        }
        return licencias
    }
    async nuevaLicencia(recurso_id,licencia){
        const result = await mysqlLib.execute('CALL sp_nueva_licencia(?,?,?,?,?)',
        [
            recurso_id,
            licencia.credencial_usuario,
            licencia.credencial_contrasena,
            licencia.credencial_key,
            licencia.credenciales_estado
        ])
        const res = result[0][0]
        if(res==null){
            return 'no hay respuesta'
        }
        return res
    }
    async obtenerAsignaturas(){
        const result = await mysqlLib.execute('CALL sp_obtener_asignaturas()')
        const res  =  result[0][0]
        if(res==null){
            return 'no hay asignaturas'
        }
        return res;
    }
    async obtenerasignaturasbyasignatura(asignatura){
        const result  = await mysqlLib.execute('CALL sp_obtener_asignaturas_by_asignatura(?)',[asignatura.curso_id])
        const res = result[0][0]
        if(res==null){
            return 'no hay asignaturas'
        }
        return res
    }
    async nuevasLicencias(recurso_id, usuario, clave, credencial, estado) {
        return mysqlLib.execute('CALL sp_nueva_licencia(?,?,?,?,?)', [recurso_id, usuario, clave, credencial, estado])
            .then(result => {
                if (result && result[0] && result[0][0]) {
                    return result[0][0];
                } else {
                    return null;
                }
            })
            .catch(error => {
                console.error('Error al ejecutar la consulta:', error);
                throw error; 
            });
    }
     
}
module.exports = RecursoService;