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
            background-color: #f3f3f3;
            color: #333;
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
            color: #7D2181;
            text-align: center;
            margin-bottom: 20px;
        }
        p {
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            border: 1px solid #9b9b9b;
            border-radius: 10px;
        }
        th, td {
            border: 1px solid #9b9b9b;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f0f0f0;
            color: #333;
        }
        td.correo {
            color: #7D2181;
            background-color: #f0f0f0;
        }
        td.contraseña {
            color: #333;
            background-color: #f0f0f0;
        }
        .Firma {
            margin-top: 20px;
        }
        .Firma p {
            margin-top: -10px;
            color: #000000;
        }
    </style>
</head>
<body>
    <h1>Bienvenido a 
`;
const mensajemediado = `</h1>
<p>Estimado Docente,</p>
<p>Nos complace informarle que su reserva ha sido confirmada.</p>`

const intermedio = `<p>Agradecemos su preferencia y quedamos a su disposición para cualquier consulta adicional. A continuación, encontrará la información de acceso a su cuenta en `;
const MensajeIntermedio = `:</p>
<div class="container">`
const footer = `
        </table>
        <p>Por favor, guarde esta información de manera segura y no la comparta con nadie.</p>
        <p>Gracias por utilizar nuestros servicios.</p>
    </div>
<div class="Firma">
    <img src="https://ci3.googleusercontent.com/meips/ADKq_NbjbRQSL5VD_9BCxv4gejiY4mjNzWpTTanDNVEED2F6bp9Tts5wN3CJwWwdhWKtv0z-vTSecME8rIAJ8vMOMUWcPAK7TYdx88z8ekQ4NLBxMZPoSnMlG3HWEwDFfw=s0-d-e1-ft#https://ucontinental.edu.pe/documentos/logo/crea-tu-propia-historia.gif" alt="Gif">
    <p style="font-weight: bold; font-size: 18px;">Recursos Académicos Virtuales</p>
    <p>Laboratorios y Talleres <br> +51 945 605752</p>
</div>
</body>
</html>
`;

module.exports = { htmlContent,mensajemediado, intermedio,MensajeIntermedio, footer };