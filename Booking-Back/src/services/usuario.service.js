const mysqlLib = require('../../libs/mysql')
class UsuarioService{
    constructor(){}
    
    async verificarUsuario(correo){
        const result = await mysqlLib.execute('CALL sp_usuario_verificarusuario(?, @usuario_encontrado)', [correo]);
        const [usuario_encontrado] = result[0][0];
        if (usuario_encontrado == null){
            return null
        }
        return usuario_encontrado;
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
    
}
module.exports = UsuarioService;