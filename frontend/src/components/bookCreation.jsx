import BookForm from './bookForm';
import toastAlert from '../helpers/toastAlert';

const book = {
  id: 0,
  title: '',
  author: '',
  publishedYear: 0,
  genre: ''
}

const BookCreation = () => {

  const insertBook = async(data) => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_LIBRARY_API}setBook`, {
          method: 'POST',
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


  const saveBookHandler = async (data) => {
    const result = await insertBook(data);
    if (result === 'Ok') {
      toastAlert('success', 'Book created!');
    }
    else {
      toastAlert('error', 'The book could not be inserted!');
    }
  }

  return <BookForm currentBook={book} onSave={saveBookHandler}/>
}

export default BookCreation