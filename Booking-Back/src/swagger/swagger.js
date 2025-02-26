const swaggerJsdoc = require("swagger-jsdoc"); 

const options ={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Booking API',
            version:'1.0.0',
            description: 'API para la administracion de Booking',
            contact:{
                name:'Nombre Desarrollador'
            },
            servers:[
                {
                    url:'http://localhost:3000',
                    description:'Local server'
                }
            ],
        },  
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ BearerAuth: [] }], 
    },
    apis:['./src/routes/*.js'] // Ruta a los archivos de rutas con comentarios Swagger
    //apis:['./swagger/swagger.yaml'] // Ruta a los archivos de rutas con comentarios Swagger
};

const specs = swaggerJsdoc(options);
module.exports= specs; 