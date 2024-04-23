const mysqlLib = require('./../../libs/mysql');

class ListarReservaService {

  async listarRecurso(data) {
    try {
      const params = [
        data.id_docente,
        data.id_bloque || null,
        data.fechaReservaInicio || null,
        data.fechaReservaFin || null,
        data.fechaRegistroInicio || null,
        data.fechaRegistroFin || null,
      ];

      return await mysqlLib.execute('call sp_listar_reservas_docente(?, ?, ?, ?, ?, ?);', params);
    } catch (error) {
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async listarRecursoAdministrador (data){
    try{
      const params =[
        data.id_docente || null,
        data.id_recurso || null,
        data.id_bloques || null,
        data.fechaReservaInicio || null,
        data.fechaReservaFin || null,
        data.fechaRegistroInicio || null,
        data.fechaRegistroFin || null,
        data.estado_reserva || null,
      ];
      return await mysqlLib.execute('call sp_listar_reserva_administrador(?, ?, ?, ?, ?, ?, ?, ?);', params);
    }
    catch(error){
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
}
module.exports = ListarReservaService;
