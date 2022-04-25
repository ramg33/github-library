/*
    Author:         Rodrigo Moza
    Date:           2022-04-21
    Description:    Transactions controller with all the queries.
*/
const pool = require('../db/connection')

exports.getUserTransactions = async (req, res) => {
  
  const result = await pool.query(`SELECT "transactions".id, "books".id as "bookId", "title", "author", "publishedYear", "genre", 
    "requestDate", "returnDate" FROM "transactions" JOIN "books" ON "books".Id = "transactions"."bookId"
    where "transactions"."userId"=${req.params.userId}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{ console.log(err.message) }
    });

  return result;

};

exports.setTransaction = async (req, res) => {
  const trans = req.body;
  let insertQuery = ` Insert into transactions ("userId", "bookId", "status", "requestDate")
  values('${trans.userId}', '${trans.bookId}', 'A', CURRENT_DATE); 
  Update books set available = available - 1
  where id = ${trans.bookId};`
  
  const result = await pool.query(insertQuery, (err, result)=>{
      if(!err){
          res.send({msg:'Ok'});
      }
      else{ console.log(err.message) }
  });
  return result;

}

exports.updateTransaction = async (req, res) => {
  
    const trans = req.body;
    let insertQuery = ` Update transactions set "status"='I', "returnDate"=CURRENT_DATE
        where id=${trans.id}; 
        Update books set available = available + 1
        where id = '${trans.bookId}'`
    
    const result = await pool.query(insertQuery, (err, result)=>{
        if(!err){
            res.send({msg:'Ok'});
        }
        else{ console.log(err.message) }
    })
  
    return result;
  
}