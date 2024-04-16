const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo de Acceso a Algetec</title>
    <style>
        /* Estilos CSS para el correo electrónico */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f3f3f3; /* Fondo gris claro */
            color: #333; /* Texto en negro para mayor contraste */
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            background-color: #ccc;
        }
        h1 {
            color: #ffcc00;
            text-align: center;
            margin-bottom: 20px;
        }
        p {
            color: #666; /* Texto en gris oscuro */
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            border: 1px solid #9b9b9b; /* Borde gris claro */
            border-radius: 10px;
        }
        th, td {
            border: 1px solid #9b9b9b; /* Borde gris claro */
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f0f0f0; /* Fondo gris claro */
            color: #333; /* Texto en negro */
        }
        td.correo {
            color: #ffcc00;
            background-color: #f0f0f0;
        }
        td.contraseña {
            color: #333; /* Texto en negro */
            background-color: #f0f0f0;
        }
        .Firma{

          margin-top: 20px;
        }
        .Firma p{
          margin-top: -10px;

        }
        .export-btn {
            background-color: #1a73e8; /* Color del botón similar al de Google Sheets */
            color: #fff; /* Texto en blanco */
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
  <h1>Bienvenido a Algetec</h1>
  <p>Estimado Docente,</p>
    <p>Nos complace informarle que su reserva ha sido confirmada.</p>
    <p>Detalles de la reserva:<br>- Fecha: 2014-05-06 <br>- Rango de Horario : 7:00:00 - 8:30:00</p>
    <p>Agradecemos su preferencia y quedamos a su disposición para cualquier consulta adicional,a continuación, encontrará la información de acceso a su cuenta en Algetec:</p>
    <div class="container">
    <div>
      <p>Lista de Credenciales de Algetec: </p>
      <button class="export-btn" onclick="exportToExcel()">Exportar a Excel</button>
    </div>
        <table>
            <tr>
                <th>Correo</th>
                <th>Contraseña</th>
            </tr>
            ${Array.from({ length: 20 }, (_, i) => `<tr>
                <td class="correo">algetec${(i + 1).toString().padStart(3, '0')}@continental.edu.pe</td>
                <td class="contraseña">Contialgete2023</td>
            </tr>`).join('')}
        </table>
        <p>Por favor, guarde esta información de manera segura y no la comparta con nadie.</p>
      <p>Gracias por utilizar nuestros servicios.</p>
    </div>
    <div class="Firma">
      <img src="https://conecta.continental.edu.pe/wp-content/uploads/2024/crea-tu-propia-historia.gif" alt="Gif">
      <p style="font-weight: bold; font-size: 18px;">Recursos Académicos Virtuales</>
      <p>Laboratorios y Talleres <br> +51 945 605752</p>
    </div>

<script>
    function exportToExcel() {
        const table = document.querySelector('table');
        const rows = table.querySelectorAll('tr');


`;

module.exports = htmlContent;
