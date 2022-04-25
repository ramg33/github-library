
/*
    Author:         Rodrigo Moza
    Date:           2022-04-21
    Description:    Index for setting application
*/
const express = require('express');
const routes = require('./routes');
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();

var cors=require('cors');

app.use(cors({origin:true,credentials: true}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', routes());

app.listen(8080, ()=>{
    console.log("Sever is now listening at port 8080");
});


