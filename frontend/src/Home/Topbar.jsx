import React from 'react';
import './Home.css'; // Assuming your CSS is in Navbar.css
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();
  return (
    <div className="top-wrapper">
      <div className="wrapper">
        <div className="topbar">
          <div className="topbar-left">
            <div className='header'>
                <h1>RDA</h1>
            </div>
          </div>
          <div className="topbar-right">
            <button className='top-items' onClick={() => navigate('main')}> Home </button>
            <button className='top-items' onClick={() => navigate('regist')}> Regist </button>
            <button className='top-items' onClick={() => navigate('entroll')}> Entroll </button>
            <button className='top-items' onClick={() => navigate('feedback')}> Feedback </button>
            <button className="top-items" onClick={() => navigate('/')}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
