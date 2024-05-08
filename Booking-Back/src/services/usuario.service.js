const mysqlLib = require('../../libs/mysql')
class UsuarioService{
    constructor(){}
    
    async verificarUsuario(correo) {
        try {
            const result = await mysqlLib.execute('CALL sp_usuario_verificarusuario(?, @usuario_encontrado)', [correo]);
            const [[usuario_encontrado]] = result[0];
            
            return usuario_encontrado;
        } catch (error) {
            if (error.code === 'PROCEDURE_USAGE_ERROR') {
                throw new Error('El usuario no se encuentra');
            } else {
                throw error;
            }
        }
    }
    
    async actualizarUsuario(usuario_nombres, usuario_apellidos, usuario_correo) {
        const params = [usuario_correo, usuario_nombres, usuario_apellidos];
    
        const result = await mysqlLib.execute('CALL sp_actualizar_usuario(?, ?, ?)', params);
        const usuario_actualizado = result[0][0];
    
        if (!usuario_actualizado) {
            return null;
        }
    
        return usuario_actualizado;
    }
    async mostrarUsuarios(){
        const result = await mysqlLib.execute('CALL sp_mostrar_usuarios()')
        const usuarios = result [0][0];
        if(usuarios==null){
            return 'No hay usuarios existentes'
        }
        return usuarios;
    }
    async obtenerUsuario(correo){
        const result = await mysqlLib.execute('CALL sp_obtener_usuario(?)',[correo])
        const usuario = result[0][0]
        if(!usuario){
            return null
        }
        return usuario;
    }
    async editarUsuario(usuarioId, usuarioData) {
        const result = await mysqlLib.execute('CALL sp_editar_usuario(?, ?, ?, ?, ?)', [
            usuarioId,
            usuarioData.usuario_nombres,
            usuarioData.usuario_apellidos,
            usuarioData.usuario_correo,
            usuarioData.usuario_rol
        ]);
        const usuario = result[0][0];
        if (!usuario) {
            return null;
        }
        return usuario;
    }
    async deshabilitarUsuario(usuarioId){
        const result = await mysqlLib.execute('CALL sp_deshabilitar_usuario(?)',[usuarioId]);
        return result;
    }
    async habilitarUsuario(usuarioId){
        const result = await mysqlLib.execute('CALL sp_habilitar_usuario(?)',[usuarioId]);
        return result;
    }
    async nuevoUsuario(usuario){
        const result = await mysqlLib.execute('CALL sp_nuevo_usuario(?,?,?,?,?)',[
            usuario.usuario_nombres,
            usuario.usuario_apellidos,
            usuario.usuario_correo,
            usuario.usuario_rol,
            usuario.usuario_estado
        ]);
        const resultado = result[0][0]
        if(!usuario){
            return null
        }
    }
}
module.exports = UsuarioService;