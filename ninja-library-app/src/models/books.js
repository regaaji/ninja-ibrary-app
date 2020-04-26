const connection = require('../config/mysql')

module.exports = {
    countData: (searchTitle) => {
        return new Promise((resolve, reject) => {
          connection.query(`SELECT count(*) as totalData FROM books WHERE title LIKE '%${searchTitle}%'`, (error, result) => {
              if (error) reject(new Error(error))
                  resolve(result[0].totalData)
          })
      })
    },

    getAllBooks: (searchTitle, pagination) => {
        return new Promise((resolve, reject) => {
        const totalData = connection.query('SELECT count (*) FROM books')
    // const totalPages = Math.ceil(totalData / limit)
    // const firstData = ((limit * activePage) - limit)

    const firstData = ((pagination.limit * pagination.activePage) - pagination.limit)

        connection.query(`SELECT b.id, b.title, g.name as author, a.name as genre, s.name as statusbook FROM books b INNER JOIN authors g ON b.author = g.id INNER JOIN genres a ON b.genre = a.id INNER JOIN statusbook s ON b.status = s.id
          WHERE title LIKE '%${searchTitle}%'
          ORDER BY ${pagination.sortBy} ${pagination.orderBy}
          LIMIT ${firstData},${pagination.limit}`,
          (error, result) => {
            if (error) reject(new Error(error))
                resolve(result)
        })
      })
    },

    getBookDataByID: function (id) {
        return new Promise(function (resolve, reject) {
            connection.query('SELECT b.id, b.title, b.description, b.image, b.status, g.name as author, a.name as genre, s.name as statusbook FROM books b INNER JOIN authors g ON b.author = g.id INNER JOIN genres a ON b.genre = a.id INNER JOIN statusbook s ON b.status = s.id  WHERE b.id = ?', [id], function (error, result) {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },

    addNewBook: (data) => {
      return new Promise((resolve, reject) => {
          connection.query('INSERT INTO books SET ?', data, (error, result) => {
        // connection.query('INSERT INTO products SET ?', data)
        // connection.query('SELECT products.id, products.name, products.description, products.image, products.price, products.stock, category.name FROM products LEFT JOIN category ON products.id_category = category.id', (error, result) => {
          if (error) reject(new Error(error))
            resolve(result)
        })
      })
    },

    editBookData: (data, id) => {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE books SET ? WHERE id = ?', [data, id], (error, result) => {
          if (error) reject(new Error(error))
            resolve(result)
        })
      })
    },

     borrowBookData: (id) => {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE books SET status = ? WHERE id = ?', [2, id], (error, result) => {
          if (error) reject(new Error(error))
            resolve(result)
        })
      })
    },


     returnBookData: (id) => {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE books SET status = ? WHERE id = ?', [1, id], (error, result) => {
          if (error) reject(new Error(error))
            resolve(result)
        })
      })
    },


    deleteBookData: (id) => {
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM books WHERE id = ?', id, (error, result) => {
          if (error) reject(new Error(error))
            resolve(result)
        })
      })
    }


};