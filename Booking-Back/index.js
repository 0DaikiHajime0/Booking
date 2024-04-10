const routerApi = require('./src/routes');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server Back End Booking is running!');
});
routerApi(app);
const server = app.listen(port, () => {
  console.log('Servidor Express escuchando en el puerto:', port);
});


