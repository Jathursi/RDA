import React from 'react';
import './Home.css'; // Assuming your CSS is in Navbar.css
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();
  return (
    <div className="top-home-wrapper">
      <div className="wrapper-home">
        <div className="topbar-home">
          <div className="topbar-home-left">
            <div className='header'>
                <h1>RDA</h1>
            </div>
          </div>
          <div className="topbar-home-right">
            <button className='top-items-home' onClick={() => navigate('main')}> Home </button>
            <button className='top-items-home' onClick={() => navigate('regist')}> Regist </button>
            <button className='top-items-home' onClick={() => navigate('entroll')}> Entroll </button>
            <button className='top-items-home' onClick={() => navigate('feedback')}> Feedback </button>
            <button className="top-items-home" onClick={() => navigate('/')}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
