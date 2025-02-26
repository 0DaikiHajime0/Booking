const routerApi = require('./src/routes');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server Back End Booking is running!');
});
routerApi(app);
const server = app.listen(port, () => {
  console.log('Servidor Express escuchando en el puerto:', port);
});


