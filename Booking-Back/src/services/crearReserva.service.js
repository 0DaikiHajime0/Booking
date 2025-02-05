const boom = require('@hapi/boom');
const mysqlLib = require('./../../libs/mysql');
const transporter = require('./../../libs/mailConfig');
const { htmlContent,mensajemediado, intermedio,MensajeIntermedio, footer } = require('./../shared/EmailSend')
const excel = require('exceljs');


class CrearReservaService {

  constructor() { }

  async create(data) {
    try {
      const params = [
        data.id_usuario,
        data.rol, data.id_docente,
        data.id_asignatura,
        data.id_recurso,
        data.fecha,
        data.id_bloque,
        data.reserva_cant,
        data.nrc]
      return await mysqlLib.execute('call sp_realizar_reserva(?,?,?,?,?,?,?,?,?);', params);
    } catch (error) {
      throw new Error('Error (create) al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async findCurso(id) {
    try {
      const [curso] = await mysqlLib.execute('call sp_listar_curso_x_docente(?);', [id]);
      return curso
    } catch (error) {
      throw new Error('Error (findCurso) al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async findRecurso(id) {
    try {
      const [recursos] = await mysqlLib.execute('call sp_listar_recurso_x_curso(?);', [id]);
      return recursos
    } catch (error) {
      throw new Error('Error (findRecurso) al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async findBloque() {
    try {
      const [bloques] = await mysqlLib.execute('call booking.sp_listar_bloques();');
      return bloques
    } catch (error) {
      throw new Error('Error (findBloque) al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }
  async findDisplonibilidad(data) {
    const fechaFormateada = new Date(data.fecha).toISOString().split('T')[0];
    const params = [
      data.id_recurso,
      data.id_bloque,
      fechaFormateada];
    try {
      const [result] = await mysqlLib.execute('select booking.ft_devolver_cantidad_credenciales_disponible(?,?,?) as cantidad_disponible;', params);
      return result[0];
    } catch (error) {
      throw new Error('Error (findDisplonibilidad) al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }

  async enviarcredencial(data) {
    const fechaFormateada = new Date(data.fecha).toISOString().split('T')[0];
    const correoDocente = data.docente_correo;
    const params = [
        data.id_docente,
        data.id_asignatura,
        data.id_recurso,
        data.id_bloque,
        fechaFormateada,
        data.nrc,
    ];
    const docenteparams = [
        data.id_recurso,
        data.id_docente,
    ];
    const recursoparams = [data.id_recurso]

    try {
        const [credencialesResult] = await mysqlLib.execute('call sp_listar_credenciales_reservadas(?,?,?,?,?,?);', params);
        const [FechaResult] = await mysqlLib.execute('call listar_fecha_horario_reserva(?,?,?,?,?,?);', params);
        const [mensaje] = await mysqlLib.execute("SELECT 'Revise su correo' AS mensaje;");
        const [credencialDocente] = await mysqlLib.execute('call sp_listar_credencial_docente_recurso(?,?)', docenteparams);
        const [RecursoResult] = await mysqlLib.execute('call sp_listar_recursos_by_id(?)',recursoparams);

        if (!credencialesResult || credencialesResult.length === 0 || !FechaResult || FechaResult.length === 0) {
            throw new Error('No se encontraron credenciales');
        }

        let credencialesHTML = '';
        let credencialesDocenteHTML = '';
        let contenidoHTML = '';
        let InicioTabla = '';
        let RecursoNombre = '';

        RecursoNombre = RecursoResult[0].map(recurso => `${recurso.recurso_nombre}
            `).join('');

        if (credencialDocente && credencialDocente[0] && credencialDocente[0].length > 0 && credencialDocente[0][0].result === 1) {
          
          InicioTabla = `
          <h3>Credencial:</h3>
          <table>
            <tr>
                <th>Código de activación</th>
            </tr>`;

          credencialesHTML = credencialesResult[0].map(credencial => `
          <tr>
              <td class="contraseña">${credencial.credencial_contrasena}</td>
          </tr>
          </table>
      `).join('');
        } else {
            InicioTabla = `<table>
            <tr>
                <th>Correo</th>
                <th>Contraseña</th>
            </tr>`;
            
            credencialesHTML = credencialesResult[0].map(credencial => `
                <tr>
                    <td class="correo">${credencial.credencial_usuario}</td>
                    <td class="contraseña">${credencial.credencial_contrasena}</td>
                </tr>
            `).join('');

            credencialesDocenteHTML = `
                <h3>Credenciales del Docente:</h3>
                <table>
                    <tr>
                        <th>Correo</th>
                        <th>Contraseña</th>
                    </tr>
                    ${credencialDocente[0].map(credencial => `
                        <tr>
                            <td class="correo">${credencial.credencial_usuario}</td>
                            <td class="contraseña">${credencial.credencial_contrasena}</td>
                        </tr>
                    `).join('')}
                </table>
                <h3>Credenciales de los Estudiantes:</h3>
            `;
        }

        const fechaHTML = FechaResult[0].map(fecha => {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const fechaFormateada = new Date(fecha.reserva_fecha).toLocaleDateString('es-ES', options);
            return `<p>-Fecha: ${fechaFormateada}<br>-Horario: ${fecha.bloque_rango}</p>`;
        }).join('');

        contenidoHTML = `
            ${htmlContent}
            ${RecursoNombre}
            ${`</h1>
            <p>Estimado Docente,</p>
            <p>Nos complace informarle que su reserva ha sido confirmada.</p>`}
            ${fechaHTML}
            ${intermedio}
            ${RecursoNombre}
            ${MensajeIntermedio}
            ${credencialesDocenteHTML}
            ${InicioTabla}
            ${credencialesHTML}
            ${footer}
        `;

        const mailOptions = {
            from: 'lab.recursosvirt@continental.edu.pe',
            to: correoDocente,
            subject: 'Credenciales de acceso a '+RecursoNombre,
            text: 'Credenciales de acceso a '+RecursoNombre,
            html: contenidoHTML
        };

        await transporter.sendMail(mailOptions);
        return mensaje[0];

    } catch (error) {
        throw new Error('Error (enviarcredencial) al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }

  async generarReservaGeneral(data){
    try {
      const params = [
        data.id_usuario,
        data.id_recurso,
        data.fecha
      ]
      return await mysqlLib.execute('call sp_realizar_reserva_general(?,?,?);', params);
    } catch (error) {
      throw new Error('Error (generarReservaGeneral) al ejecutar la consulta a la base de datos: ' + error.message);
    }
  }

  async generarArchivoExcel(credenciales) {
    try {
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Credenciales');
      worksheet.columns = [
        { header: 'Correo', key: 'correo' },
        { header: 'Contraseña', key: 'contraseña' },
      ];
      credenciales.forEach(credencial => {
        worksheet.addRow({ correo: credencial.credencial_usuario, contraseña: credencial.credencial_contrasena });
      });
      const buffer = await workbook.xlsx.writeBuffer();

      return buffer;
    } catch (error) {
      throw new Error('Error al generar el archivo Excel: ' + error.message);
    }
  }
  async generarArchivoExcel(credenciales) {
    try {
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Credenciales');
      worksheet.columns = [
        { header: 'Correo', key: 'correo' },
        { header: 'Contraseña', key: 'contraseña' },
      ];
      credenciales.forEach(credencial => {
        worksheet.addRow({ correo: credencial.credencial_usuario, contraseña: credencial.credencial_contrasena });
      });
      const buffer = await workbook.xlsx.writeBuffer();
      return buffer;
    } catch (error) {
      throw new Error('Error al generar el archivo Excel: ' + error.message);
    }
  }
  async listardisponibilidadCalendario(id_recurso){
    try {
      return await mysqlLib.execute('call sp_obtener_licencias_disponibles_calendario(?);', [id_recurso]);
    } catch (error) {
      throw new Error('Error (listardisponibilidadCalendario) al ejecutar la consulta a la base de datos: ' + error.message);
    }
}
// ----------------------------- admin

async listarDocente() {
  try {
    return mysqlLib.execute('CALL sp_listar_docente()'); // Corrección en el nombre de la función y la sintaxis de la llamada
  } catch (error) {
    throw new Error('Error (listarDocente) al ejecutar la consulta a la base de datos: ' + error.message);
  }
}



}
module.exports = CrearReservaService;
