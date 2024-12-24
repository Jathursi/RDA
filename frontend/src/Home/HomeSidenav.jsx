import React from 'react';
import { IoHome } from "react-icons/io5";
import { PiTrademarkRegistered } from "react-icons/pi";
import { MdFeedback } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import img from '../Assets/log.png';
// import '../App.css';
import '../App.css';

function HomeSidenav() {
    const navigate = useNavigate();
    return (
        <div className='sticky-top  p-2 bg-light'>
            <div className='m-2'>
                <span className='brand-name fs-4'>RDA</span>
            </div>
            <hr className='bg-white' />
            <div className='list-group list-group-flush'>
                <div 
                    className='list-group-item bg-light py-2'
                    style={{whiteSpace: 'nowrap'}} 
                    onClick={() => navigate('/home')}
                >
                    <IoHome className='fs-5 me-3' />
                    <span className='fs-5 d-none d-sm-inline'>Home</span>
                </div>
                <div 
                    className='list-group-item bg-light py-2' 
                    onClick={() => navigate('regist')}
                    style={{whiteSpace: 'nowrap'}} 
                >
                    <PiTrademarkRegistered className='fs-5 me-3' />
                    <span className='fs-5 d-none d-sm-inline'>Register</span>
                </div>
                <div 
                    className='list-group-item bg-light py-2' 
                    onClick={() => navigate('entroll')}
                    style={{whiteSpace: 'nowrap'}} 
                >
                    <FaPenNib className='fs-5 me-3' />
                    <span className='fs-5 d-none d-sm-inline'>Enroll</span>
                </div>
                <div
                    className='list-group-item bg-light py-2' 
                    onClick={() => navigate('feedback')}
                    style={{whiteSpace: 'nowrap'}} 
                >
                    <MdFeedback className='fs-5 me-3' />
                    <span className='fs-5 d-none d-sm-inline'>Feedback</span>
                </div>
                <div className='list-group-item bg-light py-2'
                    style={{whiteSpace: 'nowrap'}} 
                >
                    <CgProfile className='fs-5 me-3' />
                    <span className='fs-5 d-none d-sm-inline'>Profile</span>
                </div>
            </div>
        </div>
    );
}

export default HomeSidenav;
