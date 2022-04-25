import { useRef } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button,
  Label
} from 'reactstrap';

import './components.css';

const BookForm = ({option = 'I', currentBook, onSave}) => {
  const titleRef = useRef();
  const authorRef = useRef();
  const publishedYearRef = useRef();
  const genreRef = useRef();
  const stockRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value ? titleRef.current.value.trim() : '';
    const author = authorRef.current.value ? authorRef.current.value.trim() : '';
    const publishedYear = publishedYearRef.current.value ? publishedYearRef.current.value.trim() : '';
    const genre = genreRef.current.value ? genreRef.current.value.trim() : '';
    const stock = stockRef.current.value ? stockRef.current.value.trim() : '';

    if (!title) {
      alert('The title is required!');
      return;
    }
    if (!author) {
      alert('The author is required!');
      return;
    }
    if (!genre) {
      alert('The genre is required!');
      return;
    }
    if (!Number.isInteger(parseInt(publishedYear))) {
      alert('The publish year must be a number!');
      return;
    }
    if (!Number.isInteger(parseInt(stock))) {
      alert('The stock must be a number!');
      return;
    }

    const newBook = {
      title,
      author,
      publishedYear,
      genre,
      stock: parseInt(stock)
    }
    titleRef.current.value = '';
    authorRef.current.value = '';
    publishedYearRef.current.value = '';
    genreRef.current.value = '';
    stockRef.current.value = '';
    onSave(newBook, option)
  }

  const handleCancel = (e) => {
    e.preventDefault()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>
        Books
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit} >

          <FormGroup row>
            <Label sm='3' for='title'> Title </Label>
            <Col sm='9'>
              <Input type='text' id='title' placeholder='Insert the title' innerRef={titleRef} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='Author'> Author </Label>
            <Col sm='9'>
              <Input type='text' id='author' placeholder='Insert the Author' innerRef={authorRef} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='publishedYear'> Published Year </Label>
            <Col sm='9'>
                <Input type='numeric' id='publishedYear' placeholder='Insert the Published year' innerRef={publishedYearRef} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='genre'> Genre </Label>
            <Col sm='9'>
                <Input type='numeric' name='genre' id='genre' placeholder='Insert the genre' innerRef={genreRef} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='stock'> Stock </Label>
            <Col sm='9'>
                <Input type='numeric' name='stock' id='stock' placeholder='Insert the stock' innerRef={stockRef} />
            </Col>
          </FormGroup>

          <FormGroup className='mb-0' row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button className='mr-1' color='primary' type='submit'>
                {option === 'I' ? 'Add' : 'Save'}
              </Button>
              <Button outline className='mr-1 space_elements' color='secondary' type='button' onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  )
}

export default BookForm;