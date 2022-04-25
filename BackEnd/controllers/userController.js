/*
    Author:         Rodrigo Moza
    Date:           2022-04-21
    Description:    User controller with all the queries.
*/
const pool = require('../db/connection')

exports.getUsers = async (req, res) => {

  const users = await pool.query(`Select * from users`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });

  return users;

};

exports.getUserById = async (req, res) => {

  const user = await pool.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
    if(!err){
      res.send(result.rows);
    }
  });

  return user;

};

exports.getUserByCredentials = async (req, res) => {
  const user = await pool.query(`Select * from users where "userName"='${req.params.name}'
    and "password"='${req.params.password}'`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
  });

  return user;

};

exports.getUserRoles = async (req, res) => {

  const users = await pool.query(`SELECT * FROM "accessByRol" JOIN  "users" ON "users"."roleId" = "accessByRol"."roleId"
    where "users"."id" =${req.params.id}`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });

  return users;

};

exports.setUser = async (req, res) => {
  
  const user = req.body;
  let insertQuery = `Insert into users ("firstName", "lastName", "email", "roleId", "userName", "password") 
  values('${user.firstName}', '${user.lastName}', '${user.email}', ${user.roleId}, '${user.userName}', '${user.password}')`
  console.log(insertQuery)
  const result = await pool.query(insertQuery, (err, result)=>{
      if(!err){
          res.send({msg:'Ok'});
      }
      else{ console.log(err.message) }
  })

  return result;

}