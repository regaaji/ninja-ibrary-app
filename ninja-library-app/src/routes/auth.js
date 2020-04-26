const express = require('express');
const Route = express.Router();

const auth = require('../controllers/auth');

Route
    .post('/register', auth.createUser)
    .post('/login', auth.loginUser)
    .post('/token', auth.token)
    
module.exports = Route;