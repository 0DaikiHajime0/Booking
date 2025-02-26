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
    async guardarRecurso(recurso) {
        const result = await mysqlLib.execute('CALL sp_guardar_recurso(?,?,?,?)', [
            recurso.recurso_nombre,
            recurso.recurso_empresa,
            recurso.recurso_cant_credenciales,
            recurso.recurso_estado
        ]);
    
        const res = result[0][0];
        
        if (!res) {
            return 'No hay respuesta';
        }
    
        return res;
    }
    
    async editarRecurso(recurso){
        const result = await mysqlLib.execute('CALL sp_editar_recurso(?,?,?,?,?)',[recurso.recurso_id,recurso.recurso_nombre,recurso.recurso_empresa,recurso.recurso_estado,recurso.recurso_cant_credenciales])
        const res = result [0][0]
        if(res == null){
            return 'saved'
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
    async nuevaLicencia(licencia) {
        try {
            const result = await mysqlLib.execute('CALL sp_nueva_licencia(?,?,?,?,?)', [
                licencia.recurso_id,
                licencia.credencial_usuario,
                licencia.credencial_contrasena,
                licencia.credenciales_estado,
                licencia.credencial_tipo
            ]);
            const res = result[0][0];
            if (res == null) {
                return { success: false, message: 'No hay respuesta' };
            }
            return { success: true, data: res };
        } catch (error) {
            console.error('Error al ejecutar el procedimiento almacenado:', error);
            return { success: false, message: error.message };
        }
    }
    async editarLicencia(licencia) {
        try {
            const result = await mysqlLib.execute('CALL sp_editar_licencia(?,?,?,?,?,?)', [
                licencia.credenciales_id,
                licencia.credencial_usuario,
                licencia.credencial_contrasena,
                licencia.credencial_tipo,
                licencia.recurso_id,
                licencia.credenciales_estado
            ]);
            if (result && result[0] && result[0][0]) {
                return { success: true, data: result[0][0] };
            } else {
                return { success: false, message: 'No se encontró la licencia actualizada.' };
            }
        } catch (error) {
            console.error('Error al ejecutar el procedimiento almacenado:', error);
            return { success: false, message: error.message };
        }
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
    async nuevasLicencias(recurso_id, usuario, clave, estado, tipo) {
        try {
            const result = await mysqlLib.execute('CALL sp_nueva_licencia(?,?,?,?,?)', [
                recurso_id,
                usuario,
                clave,
                estado,
                tipo
            ]);
            if (result && result[0] && result[0][0]) {
                return result[0][0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            throw error;
        }
    }

    async nuevoCurso(objeto) {
        try {
            const result = await mysqlLib.execute('CALL sp_nuevo_curso(?, ?, ?, ?, ?, ?)', [
                objeto.curso.curso_codigo,
                objeto.curso.curso_nombre,
                objeto.curso.curso_estado,
                objeto.curso.curso_descripcion,
                objeto.curso.curso_plan,
                objeto.recurso.recurso_id
            ]);
            
            const res = result[0][0];
            
            if (!res) {
                return 'n';
            }
            
            return res;
        } catch (error) {
            console.error('Error al ejecutar el procedimiento almacenado:', error);
            throw error;
        }
    }
async asignarLicencias(asignaciones) {
    const results = [];
    const errors = [];

    for (let i = 0; i < asignaciones.docente.length; i++) {
        try {
            const result = await mysqlLib.execute('CALL sp_asignar_licencia(?, ?)', [
                asignaciones.licencia.credenciales_id,
                asignaciones.docente[i].usuario_id
                
            ]);
            const res = result[0];
            if (!res) {
                errors.push({
                    usuario_id: asignaciones.docente[i].usuario_id,
                    message: 'No se pudo asignar la licencia'
                });
            } else {
                results.push(res);
            }
        } catch (error) {
            console.error('Error al asignar la licencia para el usuario con ID ' + asignaciones.docente[i].usuario_id + ':', error);
            errors.push({
                usuario_id: asignaciones.docente[i].usuario_id,
                message: error.message
            });
        }
    }

    return {
        success: errors.length === 0,
        results,
        errors
    };
}

    
    
}
module.exports = RecursoService;