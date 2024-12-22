import React from 'react';
import './Home.css'; 
import img from '../Assets/log.png';
import { IoSearch } from "react-icons/io5";

const Topbar = () => {
    return (
        <div className="top-home-wrapper">
            <div className="wrapper-home">
                <div className="topbar-home">
                    <div className="topbar-home-left">
                        <div className='header'>
                            <img className='logo' src={img} alt='logo' />
                            <h1>RDA</h1>
                        </div>
                    </div>
                    <div className='topbar-home-right'>
                        <input type="text" placeholder='Search...' className="search" />
                        <IoSearch className="search-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;