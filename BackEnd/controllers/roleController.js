/*
    Author:         Rodrigo Moza
    Date:           2022-04-24
    Description:    Roles controller with all the queries.
*/
const pool = require('../db/connection')

exports.getRoles= async (req, res) => {

  const roles = await pool.query(`Select * from roles`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });

  return roles;

};