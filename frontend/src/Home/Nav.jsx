// import React from 'react';
// // import { MaterialIcon } from './MaterialIcon';
// // import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import {FaBars} from 'react-icons/fa'
// import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

// const Nav = ({ toggleSidebar, toggleNav }) => {
//   return (
//     <div className="top-navbar">
//       <nav className="navbar navbar-expand-lg">
//         <div className="container-fluid">
//           <button type="button" onClick={toggleSidebar} id="sidebarCollapse" className="d-xl-block d-lg-block d-md-mone d-none">
//             {/* <MaterialIcon>arrow_back_ios</MaterialIcon> */}
//             <span className="material-icons"><FaBars /></span>
//           </button>
          
//           <div className="navbar-brand"> Dashboard </div>
          
//           <button id="sidebarCollapse" className="d-inline-block d-lg-none ml-auto more-button" onClick={toggleNav}>
//             {/* <MaterialIcon>more_vert</MaterialIcon> */}
//             <span className="material-icons"><HiOutlineDotsVertical /></span>
//           </button>
          
//           <div className="collapse navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none">
//             {/* Add navbar content */}
//             <div className="nav navbar-nav ml-auto row ">
//               <input type="search" className='search col-10' placeholder="Search" />
//               <button className="btn bg-white col-2">
//                 <span className='material-icon'><YoutubeSearchedForIcon/></span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Nav;
import React, { useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaBars } from 'react-icons/fa';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

const Nav = ({ toggleSidebar, toggleNav, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="top-navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button type="button" onClick={toggleSidebar} id="sidebarCollapse" className="d-xl-block d-lg-block d-md-mone d-none">
            <span className="material-icons"><FaBars /></span>
          </button>
          
          {/* <div className="navbar-brand"> Dashboard </div> */}
          
          <button id="sidebarCollapse" className="d-inline-block d-lg-none ml-auto more-button" onClick={toggleNav}>
            <span className="material-icons"><HiOutlineDotsVertical /></span>
          </button>
          
          <div className="collapse navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none">
            <div className="nav navbar-nav ml-auto row ">
              <input 
                type="search" 
                className='search col-10' 
                placeholder="Search" 
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn bg-white col-2">
                <span className='material-icon'><YoutubeSearchedForIcon/></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;