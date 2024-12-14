import React from 'react'
import { IoHome } from "react-icons/io5";
import { PiTrademarkRegistered } from "react-icons/pi";
import { MdFeedback } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
function HomeSidenav() {
    const navigate = useNavigate();
  return (
    <div className='sidebar-home-wrap'>
    <div className='sidebar-home'>
        <div className='menu-item' onClick={() => navigate('/home')}>
            <div className='main-item' >
                <IoHome />
                <span className='text'>Home</span>
            </div>
        </div>
        <div className='menu-item' onClick={() => navigate('feedback')}>
            <div className='main-item'>
                <MdFeedback />
                <span className='text'>Feedback</span>
            </div>
        </div>
        <div className='menu-item' onClick={() => navigate('regist')}>
            <div className='main-item'>
                <PiTrademarkRegistered />
                <span className='text'>Regist</span>
            </div>
        </div>
        <div className='menu-item' onClick={() => navigate('entroll')}>
            <div className='main-item'>
                <FaPenNib />
                <span className='text'>Entroll</span>
            </div>
        </div>
        <div className='menu-item'>
            <div className='main-item'>
                <CgProfile />
                <span className='text'>Details</span>
            </div>
        </div>
    </div>
    <div className='side'>
        <div className='menu-item'>
            <div className='main-item'>
                <IoSettingsOutline />
                <span className='text'>Settings</span>
            </div>
        </div>
        <div className='menu-item'>
            <div className='main-item'>
                <CiLogout />
                <span className='text'>Log Out</span>
            </div>
        </div>

    </div>
</div>
  )
}

export default HomeSidenav