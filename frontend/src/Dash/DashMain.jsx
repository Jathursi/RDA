import React from 'react';
// import Nav from './Nav';
import DashTopnav from './DashTopnav';
import { Outlet } from 'react-router-dom';

function DashMain({ Toggle }) {
  return (
    <div className="d-flex flex-column h-100">
      <div className="topnav sticky-top bg-light  shadow-sm">
        <DashTopnav Toggle={Toggle} />
      </div>
      <div className=" p-0 mt-5 overflow-hidden  sm:p-5 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default DashMain;