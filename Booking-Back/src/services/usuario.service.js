const mysqlLib = require('../../libs/mysql')
class UsuarioService{
    constructor(){}
    
    async verificarUsuario(correo){
        const result = await mysqlLib.execute('CALL sp_usuario_verificarusuario(?, @usuario_encontrado)', [correo]);
        const usuario_encontrado = result[0][0];
        if (usuario_encontrado == null){
            return null
        }
        return usuario_encontrado;
    }
}
module.exports = UsuarioService;