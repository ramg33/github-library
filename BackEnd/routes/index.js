/*
    Author:         Rodrigo Moza
    Date:           2022-04-21
    Description:    Routes for the api
*/

const express = require('express');
const router = express.Router();
const { getUsers, getUserById, setUser, getUserByCredentials, getUserRoles } = require('../controllers/userController');
const { getBooks, getBookById, setBook, getBookByTitle, getBooksCheckIn } = require('../controllers/bookController');
const { getUserTransactions, setTransaction, updateTransaction } = require('../controllers/transactionController');
const { getRoles } = require('../controllers/roleController');

//const cors = require("cors");

module.exports = function() {

  //users
  router.get('/users', getUsers);  
  router.get('/users/:id', getUserById);
  router.get('/usersByCredentials/:name/:password', getUserByCredentials);
  router.get('/userRoles/:id', getUserRoles);
  router.post('/setUser', setUser);

  //books
  router.get('/books', getBooks);
  router.get('/booksCheckin', getBooksCheckIn);
  router.get('/books/:id', getBookById);
  router.get('/booksByName/:title', getBookByTitle);  
  router.post('/setBook', setBook);

  //transactions
  router.get('/transactions/:userId', getUserTransactions);
  router.post('/setTransaction', setTransaction);
  router.post('/updateTransaction', updateTransaction);

  //roles
  router.get('/roles', getRoles);

  return router;

}