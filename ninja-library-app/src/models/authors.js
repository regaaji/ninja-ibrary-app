const connection = require('../config/mysql')

module.exports = {
    getAuthors: function () {
        return new Promise(function (resolve, reject) {
            connection.query('SELECT * FROM authors', function (error, result) {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    
     getAllBorrowBookData: function (user_id) {
        return new Promise(function (resolve, reject) {
            connection.query('SELECT * FROM borrows WHERE user_id = ?', [user_id], function (error, result) {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },

    postAuthors: function (setData) {
        return new Promise(function (resolve, reject) {
            connection.query('INSERT INTO authors SET ?', setData, function (error, result) {
                if (!error) {
                    const newData = {
                        id: result.insertId,
                        ...setData
                    }

                    resolve(newData)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },

     putAuthor: function (setData, id) {
        return new Promise(function (resolve, reject) {
            connection.query('UPDATE authors SET ? WHERE id = ?', [setData, id], function (error, result) {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },

    deleteAuthor: function (id) {
        return new Promise(function (resolve, reject) {
            connection.query('DELETE FROM authors WHERE id = ?', id, function (error, result) {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }

}
