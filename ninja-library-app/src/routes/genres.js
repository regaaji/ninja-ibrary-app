const express = require('express')
const Route = express.Router()

const genreController = require('../controllers/genres')

Route
    .get('/', genreController.getGenres) //
    .post('/', genreController.postGenres)
    .put('/:id', genreController.putGenre)
    .delete('/:id', genreController.deleteGenre)

module.exports = Route