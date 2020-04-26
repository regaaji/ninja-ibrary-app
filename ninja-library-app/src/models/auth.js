
const connection = require('../config/mysql')

module.exports = {
    createUser: (data) => {
        return new Promise ((resolve, reject) => {
            connection.query("INSERT INTO users SET ?", data, (error, result) => {
                if(!error){
                    const goodResponse = {
                        id: result.insertId,
                        ...data
                    }
                    delete goodResponse.password
                    delete goodResponse.salt
                    delete goodResponse.updated_at
                    resolve(goodResponse)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    loginUser: (data) => {
        return new Promise ((resolve, reject) => {
            connection.query("SELECT id, username from users WHERE username=? AND password=?", [data.username, data.password], (error, result) => {
                if(!error){
                    resolve(result[0]);
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    checkUsername: (username) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE username =?`, username, (error, result) => {
            if (error) reject(new Error(error))
                resolve(result)
        })
      })
    }
}