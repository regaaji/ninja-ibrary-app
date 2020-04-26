require('dotenv/config')

module.exports = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  JWT_KEY: process.env.JWT_KEY,
  JWT_KEY_SECRET: process.env.JWT_KEY_SECRET,
  JWT_KEY_CODE: process.env.JWT_KEY_CODE

}