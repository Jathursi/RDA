import React, {useState} from 'react'
import Sidenav from './Sidenav'
import DashMain from './DashMain';
import Dashright from './Dashright';
import DashTopnav from './DashTopnav';
import { Outlet } from 'react-router-dom';
function Dash() {
const [sidebarActive, setSidebarActive] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    // <div className="container-fluid min-vh-100 d-flex flex-column">
    //   <div className="row flex-grow-1">
    //     {/* Sidebar */}
    //     {toggle && (
    //       <div className="col-2 g-0 bg-light min-vh-100">
    //         <Sidenav />
    //       </div>
    //     )}
    //     {/* Main Content */}
    //     <div className={`d-flex col-8 flex-column m-0 p-0`}>
    //       <DashMain Toggle={Toggle} />
    //     </div>
    //     {/* rightside bar */}
    //     <div className='col-2 bg-light'>
    //       {/* <Dashright /> */}
    //       <Dashright/> 
    //     </div>
    //   </div>
    // </div>
    <div className="wrapper">
      <div className={`body-overlay ${showNav ? 'show-nav' : ''}`} onClick={toggleNav} />
      <Sidenav isActive={sidebarActive} showNav={showNav} />
      <div className={`content ${sidebarActive ? 'active' : ''}`}>
        <DashTopnav toggleSidebar={toggleSidebar} toggleNav={toggleNav} />
        {/* <Dashboard /> */}
        <div className="main-content row">
          <div className="outlet col-12 col-md-10">
            <Outlet />
          </div>
          <div className="rightimages d-none d-md-block col-md-2">
            <Dashright />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dash