import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

function HomeMain({ Toggle }) {
  return (
    <div className="d-flex flex-column h-100">
      <div className="topnav sticky-top bg-light ">
        <Nav/>
        {/*Toggle={Toggle}  */}
      </div>
      <div className="home-out p-0 m-3 bg-white rounded">
        <Outlet />
      </div>
    </div>
  );
}

export default HomeMain;