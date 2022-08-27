const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const Port = 3000;

const api = require('./routes/api'); //includes api into application

const app = express(); //instance of express
app.use(bodyParser.json()); //handle json data

app.use(cors({
    origin: 'http://localhost:4300'
  }));

app.use('/api',api); //uses api from routes folder; every route with /api goes to api.js file

app.get('/', function(req,res){
    res.send('hello from server')
});

app.listen(Port, function(){
    console.log('server running on ' + Port)
});