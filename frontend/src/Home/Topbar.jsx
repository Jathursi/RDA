import React from 'react';
import './Home.css'; // Assuming your CSS is in Home.css
import { useNavigate } from 'react-router-dom';
import img from '../Assert/log.png';
import { IoSearch } from "react-icons/io5";

const Topbar = () => {
    const navigate = useNavigate();
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
                        <input type="text" placeholder='search..' className="search" />
                        <IoSearch className="search-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;