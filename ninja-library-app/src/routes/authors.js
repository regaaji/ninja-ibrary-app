const express = require('express')
const Route = express.Router()

const authorController = require('../controllers/authors')

Route
    .get('/', authorController.getAuthors) 
    .get('/history/:id', authorController.getAllBorrowBookData)
    .post('/', authorController.postAuthors)
    .put('/:id', authorController.putAuthor)
    .delete('/:id', authorController.deleteAuthor)

module.exports = Route
