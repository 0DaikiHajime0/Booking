const mysqlLib = require('../../libs/mysql')
const jwt = require('jsonwebtoken');
class AuthService{
    async verificarUsuario(correo) {
        try {
            const result = await mysqlLib.execute('CALL sp_usuario_verificarusuario(?, @usuario_encontrado)', [correo]);
            const [[usuario_encontrado]] = result[0];
            if (!usuario_encontrado) {
                throw new Error('El usuario no se encuentra');
            }
            const token = jwt.sign({ usuario_encontrado }, 'srav', { expiresIn: '2h' }); 
            return { usuario: usuario_encontrado, token };
        } catch (error) {
            throw error;
        }
    }
    async verificarRol(token){
        try {
            const decodedToken = jwt.verify(token,'srav');
            const usuario_encontrado = decodedToken.usuario_encontrado
            if(usuario_encontrado.usuario_rol=='Administrador' || usuario_encontrado.usuario_rol=='Docente'){
                return true
            }
            else{
                return false
            }
        } catch (error) {
            throw error;
        }
    }
    async obtenerUsuario(correo){
        const result = await mysqlLib.execute('CALL sp_obtener_usuario(?)',[correo])
        const usuario = result[0][0]
        if(!usuario){
            return null
        }
        return usuario;
    }
}
module.exports = AuthService;
