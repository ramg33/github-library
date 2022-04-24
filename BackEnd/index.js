
/*
    Author:         Rodrigo Moza
    Date:           2022-04-21
    Description:    Index for setting application
*/
const express = require('express');
const routes = require('./routes');
const bodyParser = require("body-parser");
const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', routes());

app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
});


