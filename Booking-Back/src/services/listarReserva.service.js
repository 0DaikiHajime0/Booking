const mysqlLib = require('./../../libs/mysql');

class ListarReservaService {

  constructor() { }

  async listarRecurso(data) {
    const params = [
      data.id_usuario,
      data.id_bloque,
      data.fechaReservaInicio,
      data.fechaReservaFin,
      data.fechaRegistroInicio,
      data.fechaRegistroFin];
    try {
      return await mysqlLib.execute('call sp_listar_reservas_docente(?,?,?,?,?,?);', params);
    } catch (error) {
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
}
module.exports = ListarReservaService;
