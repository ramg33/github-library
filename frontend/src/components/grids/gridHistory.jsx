import React, { useState } from 'react'

import {  Card
  , CardHeader
  , CardTitle
  , CardBody
  , Row
  , Col
  , Label
  , Input
 } from 'reactstrap'
// Language
import DataTable from 'react-data-table-component'
import { ChevronDown} from 'react-feather'

import ReactPaginate from 'react-paginate'

const GridHistory = ({transactions}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([transactions]);
  const [searchValue, setSearchValue] = useState('');

  const ConvertUpdatedData = (data = [], value) => {
    return ( 
    data.filter(item => {
    const startsWith =
      item.title.toString().toLowerCase().startsWith(value.toLowerCase()) ||
      item.author.toLowerCase().startsWith(value.toLowerCase()) ||
      item.genre.toLowerCase().startsWith(value.toLowerCase())
    const includes =
      item.title.toString().toLowerCase().includes(value.toLowerCase()) ||
      item.author.toLowerCase().includes(value.toLowerCase()) ||
      item.genre.toLowerCase().includes(value.toLowerCase())

    if (startsWith) {
      return startsWith;
    } else if (!startsWith && includes) {
      return includes;
    } else return null
  })
    )
}
  
  const handleFilter = e => {
    e.preventDefault();
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value)
    if (value.length) {
      updatedData = ConvertUpdatedData(transactions, value);
      setData(updatedData);
    } else {
      updatedData = transactions;
      setData(updatedData);
    }
  }

  const handlePagination = page => {
      setCurrentPage(page.selected);
  }

  const columns = [     
    {
      name: "Id",
      selector: row => row.id,
      sortable: false,
      minWidth: '50px',
      maxWidth: '50px'
    },
    {
      name: "Title",
      selector: row => row.title,
      sortable: false,
      minWidth: '150px'
    },
    {
      name: "Author",
      selector: row => row.author,
      sortable: false,
      minWidth: '150px'
    },
    {
      name: "Published Year",
      selector: row => row.publishedYear,
      sortable: false,
      minWidth: '150px'
    },
    {
      name: "Genre",
      selector: row => row.genre,
      sortable: false,
      minWidth: '100px',
      maxWidth: '100px'
    },
    {
      name: "Request",
      selector: row => row.requestDate.split('T')[0],
      sortable: false,
      minWidth: '150px',
    },
    {
      name: "Return",
      selector: row => row.returnDate ? row.returnDate.split('T')[0] : '',
      sortable: false,
      minWidth: '150px',
    }
  ]
  // ** Custom Pagination
  const customPagination = () => (
    <ReactPaginate
    previousLabel=''
    nextLabel=''
    forcePage={currentPage}
    onPageChange={page => handlePagination(page)}
    pageCount={Math.ceil(searchValue.length ? data.length / 5 : transactions.length / 5 || 1)}
    breakLabel='...'
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
    activeClassName='active'
    pageClassName='page-item'
    breakClassName='page-item'
    breakLinkClassName='page-link'
    nextLinkClassName='page-link'
    nextClassName='page-item next'
    previousClassName='page-item prev'
    previousLinkClassName='page-link'
    pageLinkClassName='page-link'
    containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )

  return (
    <Card >
      <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
        <CardTitle tag='h4'>
          History
        </CardTitle>
        <div className='d-flex mt-md-0 mt-1'>
        </div>                   
      </CardHeader>
      <Row className='justify-content-end mx-0'>
        <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
          <Label className='mr-1 space_elements' for='search-input'>Search</Label>
          <Input
            className='dataTable-filter mb-50'
            type='text'
            bsSize='sm'
            id='search-input'
            value={searchValue}
            onChange={handleFilter}
          />
        </Col>
      </Row>
      <CardBody>
    
          <DataTable
          noHeader
          pagination
          //selectableRows
          highlightOnHover
          //pointerOnHover
          columns={columns}
          paginationPerPage={5}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={customPagination}
          data=  {searchValue.length ? data : transactions}
          // selectableRowsComponent={BootstrapCheckbox}
          />
      </CardBody>
    </Card>
  )
}

export default GridHistory;