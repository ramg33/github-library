import { Outlet } from "react-router-dom";
import Sidebar from "../navigation/sidebar";

const Layout = () => {

  const navBar =[
      {
        display: 'Books',
        icon: <i className='bx bx-home'></i>,
        to: '/books',
        section: 'books'
      },
      {
        display: 'History',
        icon: <i className='bx bx-star'></i>,
        to: '/history',
        section: 'history'
      }
  ]

  if (localStorage.getItem('roleId') === '1') {
    navBar.push(
      {
        display: 'Checkin',
        icon: <i className='bx bx-star'></i>,
        to: '/checkin',
        section: 'checkin'
      }
    );
    navBar.push(
      {
        display: 'User Creation',
        icon: <i className='bx bx-calendar'></i>,
        to: '/userCreation',
        section: 'userCreation'
      }
    );
    navBar.push(
      {
        display: 'Book Creation',
        icon: <i className='bx bx-calendar'></i>,
        to: '/bookCreation',
        section: 'bookCreation'
      }
    );
  }
  
  return (
    <>
      { localStorage.getItem('userId') && <div style={{
        padding: '50px 0px 0px 370px'
      }}>
        <Sidebar sidebarNavItems={navBar.length > 1 ? navBar : []} />
        <Outlet />
      </div>
      }   
    </>
      
  );
};

export default Layout;