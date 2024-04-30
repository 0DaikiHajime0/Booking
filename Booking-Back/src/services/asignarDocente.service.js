const mysqlLib = require('./../../libs/mysql');

class  AsignarDocenteService{
  constructor(){}

  async asignarDocente(data) {
    try {
      const params = [
        data.cantidad_alumnos || null,
        data.id_curso || null,
        data.id_docente || null,
        data.nrc_curso || null,
        data.modalida_curso || null,
        data.campus_curso || null,
        data.periodo_curso || null,
        data.horario_curso || null,
        data.tipo_curso || null,
      ];
      return await mysqlLib.execute('call sp_asignar_docente_curso(?,?,?,?,?,?,?,?,?);', params);
    } catch (error) {
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }

  async CursosNoAsignados() {
    try {
      return await mysqlLib.execute('call sp_listar_cursos_no_asignado()');
    } catch (error) {
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async editarAsignacion(data){
    try{
      const params = [
        data.id_curso,
        data.id_docente,
        data.nrc_anterior,
        data.cantidad_alumnos,
        data.nrc_curso,
        data.periodo_curso,
        data.campus_curso,
        data.modalidad_curso,
      ];
      return await mysqlLib.execute('call sp_actualizar_docente_curso (?,?,?,?,?,?,?,?);',params)

    }
    catch(error){
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }

  }
  async listarDocenteCurso(id){
    try{
      const [DocenteCurso] = await mysqlLib.execute('call sp_listar_docente_curso(?);',id)
      return DocenteCurso
    }
    catch(error){
      throw new Error('Error al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  }
module.exports = AsignarDocenteService;
