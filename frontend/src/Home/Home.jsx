import React from 'react';
import Topbar from './Topbar';
import './Home.css';
import { Outlet } from 'react-router-dom';
import HomeSidenav from './HomeSidenav';

function Home() {
  return (
    <div className='home'>
        <div className='home-top'>
            <Topbar />
        </div>
        <div className='home-sidenav'>
            <HomeSidenav />
        </div>
        <div className='home-content'>
            <Outlet />
        </div>
    </div>
  );
}

export default Home;