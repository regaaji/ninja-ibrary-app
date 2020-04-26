const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');


const routeNavigator = require('./src/index')


var corsOptions = {
  origin: 'http://127.0.0.1:3000/books',
  optionsSuccessStatus: 200 
}


const server = app.listen(3000, "127.0.0.1", function () {
    const host = server.address().address
    const port = server.address().port
    

    console.log("You' are connected at " + host + ":" + port);

})

app.use(cors('*'))
app.options(cors(corsOptions))


app.use(bodyParser.urlencoded({
    extended: true
}))

//setting morgan 
app.use(morgan("dev"))

//setting route 
app.use('/', cors(), routeNavigator)