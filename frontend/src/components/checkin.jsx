import { useState, useEffect } from "react";
import GridCheckout from "./grids/gridCheckin";
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

const Checkin = () => {

  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    
    const getData = async () => {

      const fecthData = async () => {
        try {
          const getBooks = await fetch(`${process.env.REACT_APP_LIBRARY_API}booksCheckin`);
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
      const resp = await fetch(`${process.env.REACT_APP_LIBRARY_API}updateTransaction`, {
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
  
  const checkinHandler = async(transId, bookId) => {
    const data = {
      id: transId,
      bookId
    };
    const result = await changeStock(data);

    if (result === 'Ok') {
      const booksDataNew = booksData.filter(({id}) => id !== transId);
      toastAlert('success', 'Transaction Completed!');
      setBooksData(booksDataNew);
    }
    else {
      toastAlert('error', 'Transaction failed!');
    }
  }

  return <GridCheckout books={booksData} onCheckin={checkinHandler} />
  
}

export default Checkin;