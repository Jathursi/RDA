// import React, { useState } from 'react';
// // import Sidebar from './components/Sidebar';
// // import Navbar from './components/Navbar';
// // import Dashboard from './components/Dashboard';
// import HomeSidenav from './HomeSidenav';
// import Nav from './Nav';
// import '../App.css';
// import { Outlet } from 'react-router-dom';

// const Home = () => {
//   const [sidebarActive, setSidebarActive] = useState(false);
//   const [showNav, setShowNav] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarActive(!sidebarActive);
//   };

//   const toggleNav = () => {
//     setShowNav(!showNav);
//   };
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   return (
//     <div className="wrapper">
//       <div className={`body-overlay ${showNav ? 'show-nav' : ''}`} onClick={toggleNav} />
//       <HomeSidenav isActive={sidebarActive} showNav={showNav} />
//       <div className={`content ${sidebarActive ? 'active' : ''}`}>
//         <Nav toggleSidebar={toggleSidebar} toggleNav={toggleNav} onSearch={handleSearch}/>
//         {/* <Dashboard /> */}
//         <div className='main-content'>
//           <Outlet searchTerm={searchTerm}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState } from 'react';
import HomeSidenav from './HomeSidenav';
import Nav from './Nav';
import '../App.css';
import { Outlet } from 'react-router-dom';

const Home = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="wrapper">
      <div className={`body-overlay ${showNav ? 'show-nav' : ''}`} onClick={toggleNav} />
      <HomeSidenav isActive={sidebarActive} showNav={showNav} />
      <div className={`content ${sidebarActive ? 'active' : ''}`}>
        <Nav toggleSidebar={toggleSidebar} toggleNav={toggleNav} onSearch={handleSearch} />
        <div className='main-content'>
          <Outlet context={{ searchTerm }} />
        </div>
      </div>
    </div>
  );
};

export default Home;