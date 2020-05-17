const express = require('express')
const Route = express.Router()
// const multer = require('multer')

// const bookController = require('../controllers/books')

const  { bookUpload }  = require('../helpers/upload')



const book_Controller = require('../controllers/books')
const {authorization} = require('../middleware/auth')



Route
	 .all('/*', authorization)
	 .get("/", book_Controller.getAllBooks)
	 .get("/:id", book_Controller.getBookDataByID)
	 .post("/", bookUpload,  book_Controller.addNewBook )
	 .put("/update/:id", bookUpload, book_Controller.editBookData)
	 .put("/borrowHistory/:id", bookUpload, book_Controller.borrowHistoryBookData)
	 .get("/borrow/:id", bookUpload, book_Controller.getAllBorrowBook)
	 .get("/borrowHistory/", author_Controller.getAllBorrowBookData)
	 .put("/borrow/:id", bookUpload, book_Controller.borrowBookData)
	 .delete("/delete/:id", book_Controller.deleteBookData)

module.exports = Route
