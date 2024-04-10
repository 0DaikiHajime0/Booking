const boom = require('@hapi/boom');
const mysqlLib = require('./../../libs/mysql');

class ListarReservaService {

  constructor() {}

  async find(id) {
    return mysqlLib.execute('call booking.sp_docente_listarreserva(?);', [id])
  }
}

module.exports = ListarReservaService;
