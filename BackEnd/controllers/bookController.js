/*
    Author:         Rodrigo Moza
    Date:           2022-04-21
    Description:    Books controller with all the queries.
*/
const pool = require('../db/connection')

exports.getBooks = async (req, res) => {

  const books = await pool.query(`Select * from books`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });

  return books;

};

exports.getBookById = async (req, res) => {

  const book = await pool.query(`Select * from books where id=${req.params.id}`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
  });

  return book;

};

exports.getBookByTitle = async (req, res) => {
  const book = await pool.query(`Select * from books where "title"='${req.params.title}'`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
  });

  return book;

};

exports.setBook = async (req, res) => {
  
  const book = req.body;
  let insertQuery = `Insert into books ("title", "author", "publishedYear", "genre", "stock", "available") 
  values('${book.title}', '${book.author}', ${book.publishedYear}, '${book.genre}', ${stock}, ${stock})`
  
  const result = await pool.query(insertQuery, (err, result)=>{
      if(!err){
          res.send('Ok');
      }
      else{ console.log(err.message) }
  })

  return result;

}