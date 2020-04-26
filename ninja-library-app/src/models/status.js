const connection = require('../config/mysql')

module.exports = {
    getStatus: function () {
        return new Promise(function (resolve, reject) {
            connection.query('SELECT * FROM statusbook', function (error, result) {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },

    postStatus: function (setData) {
        return new Promise(function (resolve, reject) {
            connection.query('INSERT INTO statusbook SET ?', setData, function (error, result) {
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
 
    putStatus: function (setData, id) {
        return new Promise(function (resolve, reject) {
            connection.query('UPDATE statusbook SET ? WHERE id = ?', [setData, id], function (error, result) {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },

    deleteStatus: function (id) {
        return new Promise(function (resolve, reject) {
            connection.query('DELETE FROM statusbook WHERE id = ?', id, function (error, result) {
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }

}