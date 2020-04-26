const express = require('express')
const Route = express.Router()

const statusController = require('../controllers/status')

Route
    .get('/', statusController.getStatus) //
    .post('/', statusController.postStatus)
    .put('/:id', statusController.putStatus)
    .delete('/:id', statusController.deleteStatus)

module.exports = Route