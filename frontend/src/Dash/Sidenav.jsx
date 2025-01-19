import React, { useState } from 'react';
import './Sidenav.css';
import { MdAttachMoney } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { MdAttachEmail } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import { IoPrintOutline } from "react-icons/io5";
import { IoImages } from "react-icons/io5";
import { CgAttachment } from "react-icons/cg";
import { MdIncompleteCircle } from "react-icons/md";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { GiProgression } from "react-icons/gi";
const Sidenav = ({ isActive, showNav }) => {
     const navigate = useNavigate();

  return (
    // <div className='sidenav vh-100 sticky-top  p-2 bg-light'>
    //   <div className='m-2'>
    //     <span className='brand-name fs-4'>RDA</span>
    //   </div>
    //   <hr className='bg-dark' />
    //   <div className={`list-group list-group-flush bg-light ${activeMenu === 'Estimation' ? 'active' : ''}`} onClick={() => { handleMenuClick('Estimation'); }}>
    //     <div 
    //         className='list-group-item d-flex align-items-center bg-light py-2 mb-2'
    //         style={{whiteSpace: 'nowrap'}}
    //     >
        
    //     <IoIosArrowForward className='fs-5 me-3'/>
    //     <span className='fs-5 d-none d-sm-inline'>Estimate</span>
    //     </div>
    //       {activeMenu === 'Estimation' && (
    //         <div className="list-group list-group-flush px-3">
    //             <div className=" list-group-item bg-light py-2 mb-2" onClick={() => navigate('estimation')}>
    //                 <MdAttachMoney className='fs-5 me-3'/>
    //                 <span className='fs-5 d-none d-sm-inline'>Estimation</span>
    //             </div>
    //             <div className="list-group-item bg-light py-2 mb-2" onClick={() => navigate('supliment')}>
    //                 <RiMoneyDollarCircleFill className='fs-5 me-3'/>
    //                 <span className='fs-5 d-none d-sm-inline'>Suppliment</span>
    //             </div>
    //             <div className="list-group-item bg-light py-2 mb-2" onClick={() => navigate('estprint')}>
    //                 <IoPrint className='fs-5 me-3'/>
    //                 <span className='fs-5 d-none d-sm-inline py-2'>Print Estimate</span>
    //             </div>
    //             <div className="list-group-item bg-light py-2 mb-2" onClick={()=>navigate('estemail')}>
    //                 <MdEmail className='fs-5 me-3'/>
    //                 <span className='fs-5 d-none d-sm-inline'>Email</span>
    //             </div>
    //         </div>
    //         )}
    //   </div>
    //   <div className='list-group list-group-flush bg-light'>
    //     <div
    //         className='list-group-item d-flex align-items-center bg-light py-2 mb-2'
    //          onClick={() => navigate('Implement')}
    //         style={{whiteSpace: 'nowrap'}}
    //     >
    //         <RiMoneyDollarCircleFill className='fs-5 me-3'/>
    //         <span className='fs-5 d-none d-sm-inline'>Implement</span>
    //     </div>
    //     <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('attachment')}>
    //         <CgAttachment className='fs-5 me-3'/>
    //         <span className='fs-5 d-none d-sm-inline'>Final Documents</span>
    //     </div>
    //     <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('userinfo')}>
    //         <GiProgression className='fs-5 me-3'/>
    //         <span className='fs-5 d-none d-sm-inline'>Progress</span>
    //     </div>
    //     <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('outsource')}>
    //         <IoArrowUndoOutline className='fs-5 me-3'/>
    //         <span className='fs-5 d-none d-sm-inline'>Out Source</span>
    //     </div>
    //     <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('Completion')}>
    //         <MdIncompleteCircle className='fs-5 me-3'/>
    //         <span className='fs-5 d-none d-sm-inline'>Completion</span>
    //     </div>
    //     <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('comprint')}>
    //         <IoPrintOutline className='fs-5 me-3'/>
    //         <span className='fs-5 d-none d-sm-inline'>Job Card</span>
    //     </div>
    //     <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('compemail')}>
    //         <MdAttachEmail className='fs-5 me-3'/>
    //         <span className='fs-5 d-none d-sm-inline'>Final Email</span>
    //     </div>
    //   </div>
    // </div>
    <nav id="sidebar" className={`${isActive ? 'active' : ''} ${showNav ? 'show-nav' : ''}`}>
      <div className="sidebar-header">
        <h3>
          {/* <img src="/img/logo.png" alt="logo" className="img-fluid" /> */}
          <span>RDA</span>
        </h3>
      </div>
      <ul className="list-unstyled components">
        <li className="active">
          <a  className="dashboard" onClick={()=> navigate('estimation')}>
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <IoIosArrowForward />
            <span>Estimate</span>
          </a>
          
        </li>
        <li className="">
          <a onClick={()=> navigate('implement')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>Implement</span>
          </a>
        </li>
        <li className="">
          <a onClick={()=> navigate('attachment')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>Documents</span>
          </a>
        </li>
        <li className="">
          <a onClick={()=> navigate('userinfo')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>Progress</span>
          </a>
        </li>
        <li className="">
          <a onClick={()=> navigate('outsource')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>Outsource</span>
          </a>
        </li>
        <li className="">
          <a onClick={()=> navigate('completion')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>Completion</span>
          </a>
        </li>
        <li className="">
          <a onClick={()=> navigate('comprint')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>Job Card</span>
          </a>
        </li>
        <li className="">
          <a onClick={()=> navigate('compemail')} className="dashboard">
            {/* <MaterialIcon>dashboard</MaterialIcon> */}
            <span>Final Email</span>
          </a>
        </li>
      </ul>
    </nav>
    
  );
};

export default Sidenav;
