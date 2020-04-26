const authModels = require('../models/auth')
const helper = require('../helpers/index')
const jwt = require('jsonwebtoken')
const { JWT_KEY, JWT_KEY_SECRET, JWT_KEY_CODE } = require('../config')


const refreshTokens = []

module.exports = {
    createUser: async(request, response) => {
        try {
            const salt = helper.generateSalt(18)
            const hashPassword = helper.setPassword(request.body.password, salt)
            const newDate = new Date()
            const data = {
                name: request.body.name,
                username: request.body.username,
                password: hashPassword.passwordHash,
                salt: hashPassword.salt,
                role: request.body.role,
                created_at: newDate,
                updated_at: newDate
            }
            const result = await authModels.createUser(data)

            delete result.password

            return helper.response(response, 200, result)
        } catch (error) {
            console.log(error)
            return helper.response(response, 400, error)
        }
    },
    loginUser: async(request, response) => {
        try {
            const data = {
                username: request.body.username,
                password: request.body.password
            }
             const username = data.username
            const result = await authModels.checkUsername(username)

             const hashPassword = helper.setPassword(data.password, result[0].salt)


             if (hashPassword.passwordHash === result[0].password) {
                const token = jwt.sign({result, role: result[0].role}, process.env.JWT_KEY, {expiresIn: '1m'})
                const refreshToken = jwt.sign({ result, role: result[0].role}, process.env.JWT_KEY_SECRET);

                refreshTokens.push(refreshToken);

              delete result[0].salt
              delete result[0].password
              delete result[0].created_at
              delete result[0].updated_at

              result[0].token = token
              

              helper.response(response, 200, {
                ...result[0],
                refreshToken
              })

              } else {
                  response.json({
                    message: 'Password error!'
                })
              }

  
        } catch (error) {
            // console.log(error)
            return helper.response(response, 400, 'Login failed')
        }
    },

    token: async(request, response) => {
        try {

          const refreshTokenSecret = process.env.JWT_KEY_SECRET
          const api_key = process.env.JWT_KEY
          const { api_token } = request.body
          
          if (!api_token){
           return helper.response(response, 400, 'unathorization') 
         } 

         console.log(refreshTokens)

         if (!refreshTokens.includes(api_token)) {
          return response.sendStatus(403, 'Forbidden');
        }

        jwt.verify(api_token, refreshTokenSecret, (error, result) => {
          if (error) {
            return response.sendStatus(500)
          }

          // console.log(result)

            const token = jwt.sign({ result, role: result.role }, api_key, { expiresIn: '1m' })
            // console.log(token)
            return helper.response(response, 200, {
              token
            })
        })

        }catch(error){
           console.log(error)
            return helper.response(response, 400, error)
      }

    }
}