import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

function HomeMain({ Toggle }) {
  return (
    <div className="d-flex flex-column h-100">
      <div className="sticky-top bg-light">
        <Nav Toggle={Toggle} />
      </div>
      <div className=" p-0 mt-5 overflow-hidden  sm:p-5 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default HomeMain;