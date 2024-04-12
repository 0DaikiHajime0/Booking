const boom = require('@hapi/boom');
const mysqlLib = require('./../../libs/mysql');

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
}
module.exports = CrearReservaService;
