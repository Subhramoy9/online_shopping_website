const express=require("express");
const app= express();
require('./conect.js');

var cookieParser = require('cookie-parser');
const port =5000;

const products = require('./routes/ProductRoutes');
const user=require('./routes/UserRoutes');
    
app.use(express.json());
app.use(cookieParser());

app.use('/routes', products);
app.use('/routes',user);
 
app.get('/',(req,res)=>{
    res.send('hello world');
})


app.listen(port,()=>{
    console.log(`Running at port ${port}`);
})
