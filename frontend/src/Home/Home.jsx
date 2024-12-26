import React, { useState } from 'react';
import HomeSidenav from './HomeSidenav';
import HomeMain from './HomeMain';
import '../App.css';

function Home() {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <div className="row flex-grow-1">
        {/* Sidebar */}
        {toggle && (
          <div className="col-2 g-0 bg-light min-vh-100">
            <HomeSidenav />
          </div>
        )}
        {/* Main Content */}
        <div className={` col ${toggle ? 'col-10' : 'col-12'} d-flex flex-column m-0 p-0`}>
          <HomeMain Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
}

export default Home;