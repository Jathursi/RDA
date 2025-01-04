import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { MaterialIcon } from './MaterialIcon';

const HomeSidebar = ({ isActive, showNav }) => {
    const navigate = useNavigate();
  return (
    <nav id="sidebar" className={`${isActive ? 'active' : ''} ${showNav ? 'show-nav' : ''}`}>
      <div className="sidebar-header">
        <h3>
          {/* <img src="/img/logo.png" alt="logo" className="img-fluid" /> */}
          <span>RDA</span>
        </h3>
      </div>
      <ul className="list-unstyled components">
        <li className="active">
          <a onClick={()=> navigate('/home')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>log book</span>
          </a>
          
        </li>
        <li className="">
          <a onClick={()=> navigate('entroll')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>Profiles</span>
          </a>
          
        </li>
        <li className="">
          <a onClick={()=> navigate('feedback')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>Feedbacks</span>
          </a>
          
        </li>

      </ul>
    </nav>
  );
};

export default HomeSidebar;