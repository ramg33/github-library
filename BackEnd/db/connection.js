/*
    Author:         Rodrigo Moza
    Date:           2022-04-21
    Description:    Connection with postgresql 
*/
require('dotenv').config();
const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

// const pool = new Pool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     port: process.env.PORT,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });

module.exports = pool