const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(require('./routes/index'));

mongoose.connect('mongodb://localhost:27017/sample_airbnb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
},
(err, resp) => {
    if(err) throw err;
    
    console.log('Base de datos online');
});

app.listen(3000, () =>{
    console.log('Escuchando por el puerto', 3000);
});