const express= require('express');
const connectToDb = require('./db');

connectToDb();
const app = express();

app.use(express.json());

app.use('/api/auth',require('./routers/auth'));
app.use('/api/notes',require('./routers/notes'));

app.get('/',(req, res) => {
    res.send('Welcome');
})

app.listen(5000,()=>{console.log("Connected to port 5000");})