const express= require('express');
var cors = require('cors')
const connectToDb = require('./db');

connectToDb();
const app = express();
app.use(cors())

app.use(express.json());

app.use('/api/auth',require('./routers/auth'));
app.use('/api/notes',require('./routers/notes'));

app.get('/',(req, res) => {
    res.send('Welcome');
})

app.listen(5000,()=>{console.log("Connected to port 5000");})