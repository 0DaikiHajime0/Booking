const express = require('express');

const ListarReservaService = require('./../services/listarreservaService');
const { required } = require('joi');

const router = express.Router();
const service = new ListarReservaService();

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await service.find(id);
    res.json([result]);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
