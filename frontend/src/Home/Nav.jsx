import React from 'react';
// import { MaterialIcon } from './MaterialIcon';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { HiOutlineDotsVertical } from "react-icons/hi";
import {FaBars} from 'react-icons/fa'

const Nav = ({ toggleSidebar, toggleNav }) => {
  return (
    <div className="top-navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button type="button" onClick={toggleSidebar} id="sidebarCollapse" className="d-xl-block d-lg-block d-md-mone d-none">
            {/* <MaterialIcon>arrow_back_ios</MaterialIcon> */}
            <span className="material-icons"><FaBars /></span>
          </button>
          
          <div className="navbar-brand"> Dashboard </div>
          
          <button id="sidebarCollapse" className="d-inline-block d-lg-none ml-auto more-button" onClick={toggleNav}>
            {/* <MaterialIcon>more_vert</MaterialIcon> */}
            <span className="material-icons"><HiOutlineDotsVertical /></span>
          </button>
          
          <div className="collapse navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none">
            {/* Add navbar content */}
            <ul class="nav navbar-nav ml-auto">   
                            <li class="dropdown nav-item active">
                                <div className="nav-link" data-toggle="dropdown">
                                    <span class="material-icons">notifications</span>
								                    <span class="notification">4</span>
                               </div>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#">You have 5 new messages</a>
                                    </li>
                                    <li>
                                        <a href="#">You're now friend with Mike</a>
                                    </li>
                                    <li>
                                        <a href="#">Wish Mary on her birthday!</a>
                                    </li>
                                    <li>
                                        <a href="#">5 warnings in Server Console</a>
                                    </li>
                                  
                                </ul>
                            </li>
                            <li class="nav-item">
                                <div className="nav-link" >
                                  <span class="material-icons">person</span>
                                </div>
                            </li>
                            <li class="nav-item">
                              <div class="nav-link">
                                <span class="material-icons">settings</span>
                              </div>
                            </li>
                        </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;