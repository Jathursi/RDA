import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineDotsVertical } from "react-icons/hi";
import {FaBars} from 'react-icons/fa'
import AddHomeIcon from '@mui/icons-material/AddHome';
function DashTopnav({ toggleSidebar, toggleNav }) {
    const navigate = useNavigate();

  return (
    <div className="top-navbar sticky-top">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <button type="button" onClick={toggleSidebar} id="sidebarCollapse" className="d-xl-block d-lg-block d-md-mone d-none">
                {/* <MaterialIcon>arrow_back_ios</MaterialIcon> */}
                <span className="material-icons"><FaBars /></span>
              </button>
                          
              <button id="sidebarCollapse" className="d-inline-block d-lg-none ml-auto more-button" onClick={toggleNav}>
                {/* <MaterialIcon>more_vert</MaterialIcon> */}
                <span className="material-icons"><HiOutlineDotsVertical /></span>
              </button>
              
              <div className="collapse navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none">
                {/* Add navbar content */}
                <ul className="nav navbar-nav ml-auto"> 
                    <li className="nav-item">
                        <div className="nav-link" >
                          <span className="material-icons" onClick={() => navigate('/home')}><AddHomeIcon/></span>
                        </div>
                    </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    
  )
}

export default DashTopnav