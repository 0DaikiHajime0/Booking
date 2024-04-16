const boom = require('@hapi/boom');
const mysqlLib = require('./../../libs/mysql');
const transporter = require('./../../libs/mailConfing');
const  maqueta = require('./../shared/EmailSend');


class CrearReservaService {

  constructor() {}

  async create(data) {
    try {
      const params = [
        data.id_usuario,
        data.rol, data.id_docente,
        data.id_asignatura,
        data.id_recurso,
        data.fecha,
        data.id_bloque,
        data.reserva_cant];
      return await mysqlLib.execute('call sp_realizar_reserva(?,?,?,?,?,?,?,?);', params);
    } catch (error) {
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async findCurso(id) {
    try {
      return await mysqlLib.execute('call sp_listar_curso_x_docente(?);', [id]);
    } catch (error) {
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async findRecurso(id) {
    try {
      return await mysqlLib.execute('call sp_listar_recurso_x_curso(?);', [id]);
    } catch (error) {
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async findBloque() {
    try {
      return await mysqlLib.execute('call booking.sp_listar_bloques();');
    } catch (error) {
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async findDisplonibilidad(data){
    const fechaFormateada = new Date(data.fecha).toISOString().split('T')[0];
    const params = [
      data.id_recurso,
      data.id_bloque,
      fechaFormateada];
    try {
      const [result]  = await mysqlLib.execute('select booking.ft_devolver_cantidad_credenciales_disponible(?,?,?) as cantidad_disponible;',params);
      return result[0];
    } catch (error) {
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async SendMail(data){
    try {
        const mailOptions = {
            from: 'lab.recursosvirt@continental.edu.pe',
            //nespinoza@continental.edu.pe
            to: '73898440@continental.edu.pe',
            subject: 'Credenciales de acceso a Algetec',
            text: 'Credenciales de acceso a Algetec',
            html: maqueta
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Error al enviar el correo electrónico: ' + error.message);
    }
}
}
module.exports = CrearReservaService;
