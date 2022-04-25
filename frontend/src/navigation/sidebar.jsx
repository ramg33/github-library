import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { logout } from '../security/loginValidations';
import './sidebar.css';

// const sidebarNavItems = [
//     {
//         display: 'Books',
//         icon: <i className='bx bx-home'></i>,
//         to: '/books',
//         section: 'books'
//     },
//     {
//         display: 'Checkout',
//         icon: <i className='bx bx-star'></i>,
//         to: '/checkout',
//         section: 'checkout'
//     },
//     {
//         display: 'UserForm',
//         icon: <i className='bx bx-calendar'></i>,
//         to: '/userForm',
//         section: 'userForm'
//     }
// ]

const Sidebar = ({sidebarNavItems}) => {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {   
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector('.sidebar_menu_item');
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location, sidebarNavItems]);

  const logoutHandler = () => {
    logout();
    navigate("/", { replace: true });
  }

  return <div className='sidebar'>
    <div className="sidebar__logo">
        Library
    </div>
    <div ref={sidebarRef} className="sidebar__menu">
      <div
        ref={indicatorRef}
        className="sidebar_menu_indicator"
        style={{
          transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
        }}
      ></div>
      {
        sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div className={`sidebar_menu_item ${activeIndex === index ? 'active' : ''}`}>
              <div className="sidebar_menuitem_icon">
                {item.icon}
              </div>
              <div className="sidebar_menuitem_text">
                {item.display}
              </div>
            </div>
          </Link>
        ))
      }
    </div>
    <br /><br /><br />
    <div className='logout'>
      <Button color="warning" size="lg" onClick={logoutHandler}>Logout</Button>
    </div>
  </div>;
};

export default Sidebar;