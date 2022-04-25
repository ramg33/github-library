import { useState, useEffect } from "react";
import GridBooks from "./grids/gridBook";
import toastAlert from '../helpers/toastAlert';

const books = [
  {
    id: 1,
    title: 'obra 1',
    author: 'Autor 1',
    publishedYear: 2010,
    genre: 'action',
    stock: 2
  }, 
  {
    id: 2,
    title: 'obra 2',
    author: 'Autor 2',
    publishedYear: 2010,
    genre: 'action',
    stock: 5
  }, 
  {
    id: 3,
    title: 'obra 3',
    author: 'Autor 3',
    publishedYear: 1980,
    genre: 'thriller',
    stock: 1
  }, 
  {
    id: 4,
    title: 'obra 4',
    author: 'Autor 4',
    publishedYear: 1999,
    genre: 'drama',
    stock :0
  },
  {
    id: 5,
    title: 'obra 5',
    author: 'Autor 5',
    publishedYear: 1996,
    genre: 'comedy',
    stock: 3
  },
  {
    id: 6,
    title: 'obra 6',
    author: 'Autor 6',
    publishedYear: 1258,
    genre: 'drama',
    stock: 9
  }
]

const Books = () => {

  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    
    const getData = async () => {

      const fecthData = async () => {
        try {
          const getBooks = await fetch(`${process.env.REACT_APP_LIBRARY_API}books`);
          const getBooksJson = await getBooks.json();
          if (getBooksJson.length > 0) {
            return getBooksJson;
          }        
        } catch (error) {
          return 'error';
        };
      };

      const result = await fecthData();
      
      if (result === 'error') {
        toastAlert('error', 'Books not found!');        
      } else {
        setBooksData(result);
      }

    };

    getData();

  }, []);
  
  const changeStock = async(data) => {
    // console.log(data);
    try {
      // const resp = await fetch(`${process.env.LIBRARY_API}setTransaction`, {
      const resp = await fetch(`${process.env.REACT_APP_LIBRARY_API}setTransaction`, {
          method: 'POST',
          //mode: 'no-cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      const respJson = await resp.json();
      return respJson.msg;
    } catch (error) {
        return "error";
    };
  };

  const checkoutHandler = async (bookId) => {

    const data = {
      userId: localStorage.getItem('userId'),
      bookId
    };
    const result = await changeStock(data);

    if (result === 'Ok') {
      const booksDataNew = 
      booksData.map((book) => {
        if (bookId === book.id) {
          return {...book, stock: book.stock-1}
        } else {
          return {...book}
        }
      });
      toastAlert('success', 'Transaction Completed!');
      setBooksData(booksDataNew);
    }
    else {
      toastAlert('error', 'Transaction failed!');
    }
    
  }

  return <GridBooks books={booksData} onCheckout={checkoutHandler} />
}

export default Books;