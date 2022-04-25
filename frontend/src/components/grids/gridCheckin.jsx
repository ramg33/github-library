import React, { useState } from 'react'

import {  Card
  , CardHeader
  , CardTitle
  , CardBody
  , Row
  , Col
  , UncontrolledDropdown
  , DropdownToggle
  , DropdownMenu
  , DropdownItem
  , Label
  , Input
  } from 'reactstrap'
// Language
import DataTable from 'react-data-table-component'
import { ChevronDown, MoreVertical, Edit } from 'react-feather'
import ReactPaginate from 'react-paginate'

// import '../components.css';

const GridCheckin = ( {books, onCheckin }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([books]);
  const [searchValue, setSearchValue] = useState('');

  const ConvertUpdatedData = (data = [], value) => {
    return ( 
    data.filter(item => {
    const startsWith =
      item.title.toString().toLowerCase().startsWith(value.toLowerCase()) ||
      item.author.toLowerCase().startsWith(value.toLowerCase()) ||
      item.genre.toLowerCase().startsWith(value.toLowerCase());
    const includes =
      item.title.toString().toLowerCase().includes(value.toLowerCase()) ||
      item.author.toLowerCase().includes(value.toLowerCase()) ||
      item.genre.toLowerCase().includes(value.toLowerCase());

    if (startsWith) {
      return startsWith;
    } else if (!startsWith && includes) {
      return includes;
    } else return null
  })
    )
}
  
  const handleFilter = e => {
    e.preventDefault()
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value)
    if (value.length) {
      updatedData = ConvertUpdatedData(books, value);
      setData(updatedData);
    } else {
      updatedData = books;
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
      minWidth: '50px'
    },
    {
      name: "User",
      selector: row => row.userName,
      sortable: false,
      minWidth: '50px'
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
      name: 'Stock',
      selector: row => row.stock,
      sortable: true,
      minWidth: '150px',
    },    
    {
      name: 'available',
      selector: row => row.available,
      sortable: true,
      minWidth: '150px',
    },
      {
        name: "Actions",
        allowOverflow: true,
        cell: row => {

          const handleCheckin = (e) => {
            e.preventDefault();
            const transId = parseInt(e.target.id.split('_')[1]);
            const bookId = parseInt(e.target.name.split('_')[1]);
            onCheckin(transId, bookId);
          }
          return (
            <div className='d-flex'>
              <UncontrolledDropdown className='UncontrolledDropdown' >
                    <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={15} />
                      </DropdownToggle>
                        {row.stock > 0 && <DropdownMenu name={`DM_${row.bookId}`} id={`DM_${row.id}`}>
                          <DropdownItem name={`DM_${row.bookId}`} id={`DE_${row.id}`} href='/' onClick={handleCheckin}>
                            <Edit name={`DM_${row.bookId}`} id={`IE_${row.id}`} className='mr-50' size={15} />
                              Checkin
                        </DropdownItem>
                    </DropdownMenu>}
                  </UncontrolledDropdown>
            </div>
          )
        }
      }    
    ]
    // ** Custom Pagination
    const customPagination = () => (
      <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={Math.ceil(searchValue.length ? data.length / 5 : books.length / 5 || 1)}
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
          Books
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
          highlightOnHover
          columns={columns}
          paginationPerPage={5}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={customPagination}
          data=  {searchValue.length ? data : books}
        />
      </CardBody>
    </Card>
  )
}

export default GridCheckin;