const express= require('express');
const connectToDb = require('./db');

connectToDb();
const app = express();

app.use(bodyParser.json());

app.use('aut/api',require('/routes/auth'));

app.get('/',(req, res) => {
    res.send('Welcome');
})

app.listen(3000,()=>{console.log("Connected to port 3000");})