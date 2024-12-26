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
const Sidenav = () => {
  const navigate = useNavigate();
  // const navigate = useNavigate();
  // const [sidebarActive, setSidebarActive] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null); // Track the active menu

  const handleMenuClick = (menuKey) => {
    setActiveMenu((prevMenu) => (prevMenu === menuKey ? null : menuKey));
  };

  // const handleSidebarToggle = () => {
  //   setSidebarActive(!sidebarActive);
  // };

  return (
    <div className='sidenav vh-100 sticky-top  p-2 bg-light'>
      <div className='m-2'>
        <span className='brand-name fs-4'>RDA</span>
      </div>
      <hr className='bg-dark' />
      <div className={`list-group list-group-flush bg-light ${activeMenu === 'Estimation' ? 'active' : ''}`} onClick={() => { handleMenuClick('Estimation'); }}>
        <div 
            className='list-group-item d-flex align-items-center bg-light py-2 mb-2'
            style={{whiteSpace: 'nowrap'}}
        >
        
        <IoIosArrowForward className='fs-5 me-3'/>
        <span className='fs-5 d-none d-sm-inline'>Estimate</span>
        </div>
          {activeMenu === 'Estimation' && (
            <div className="list-group list-group-flush px-3">
                <div className=" list-group-item bg-light py-2 mb-2" onClick={() => navigate('estimation')}>
                    <MdAttachMoney className='fs-5 me-3'/>
                    <span className='fs-5 d-none d-sm-inline'>Estimation</span>
                </div>
                <div className="list-group-item bg-light py-2 mb-2" onClick={() => navigate('supliment')}>
                    <RiMoneyDollarCircleFill className='fs-5 me-3'/>
                    <span className='fs-5 d-none d-sm-inline'>Suppliment</span>
                </div>
                <div className="list-group-item bg-light py-2 mb-2" onClick={() => navigate('estprint')}>
                    <IoPrint className='fs-5 me-3'/>
                    <span className='fs-5 d-none d-sm-inline py-2'>Print Estimate</span>
                </div>
                <div className="list-group-item bg-light py-2 mb-2" onClick={()=>navigate('estemail')}>
                    <MdEmail className='fs-5 me-3'/>
                    <span className='fs-5 d-none d-sm-inline'>Email</span>
                </div>
            </div>
            )}
      </div>
      <div className='list-group list-group-flush bg-light'>
        <div
            className='list-group-item d-flex align-items-center bg-light py-2 mb-2'
             onClick={() => navigate('Implement')}
            style={{whiteSpace: 'nowrap'}}
        >
            <RiMoneyDollarCircleFill className='fs-5 me-3'/>
            <span className='fs-5 d-none d-sm-inline'>Implement</span>
        </div>
        <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('attachment')}>
            <CgAttachment className='fs-5 me-3'/>
            <span className='fs-5 d-none d-sm-inline'>Final Documents</span>
        </div>
        <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('userinfo')}>
            <GiProgression className='fs-5 me-3'/>
            <span className='fs-5 d-none d-sm-inline'>Progress</span>
        </div>
        <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('outsource')}>
            <IoArrowUndoOutline className='fs-5 me-3'/>
            <span className='fs-5 d-none d-sm-inline'>Out Source</span>
        </div>
        <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('Completion')}>
            <MdIncompleteCircle className='fs-5 me-3'/>
            <span className='fs-5 d-none d-sm-inline'>Completion</span>
        </div>
        <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('comprint')}>
            <IoPrintOutline className='fs-5 me-3'/>
            <span className='fs-5 d-none d-sm-inline'>Job Card</span>
        </div>
        <div className='list-group-item bg-light py-2 mb-2' onClick={() => navigate('compemail')}>
            <MdAttachEmail className='fs-5 me-3'/>
            <span className='fs-5 d-none d-sm-inline'>Final Email</span>
        </div>
      </div>
    </div>
    // <div className="">
    //   <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
    //     <div className={`menu-item ${activeMenu === 'Estimation' ? 'active' : ''}`} onClick={() => handleMenuClick('Estimation')}>
    //       <div className="main-item">
    //         <IoIosArrowForward />
    //         <span className="text">Estimation</span>
    //       </div>
            
    //     </div>
    //     <div className={`menu-item ${activeMenu === 'Implement' ? 'active' : ''}`} onClick={() => navigate('Implement')}>
    //       <div className="main-item">
    //         <RiMoneyDollarCircleFill />
    //         <span className="text">Implement</span>
    //       </div>
    //     </div>
    //     {/* <div className={`menu-item ${activeMenu === 'image' ? 'active' : ''}`} onClick={() => navigate('image')}>
    //       <div className="main-item">
    //         <IoImages />
    //         <span className="text">Image</span>
    //       </div>
    //     </div> */}
    //     <div className={`menu-item ${activeMenu === 'attachment' ? 'active' : ''}`} onClick={() => navigate('attachment')}>
    //       <div className="main-item">
    //         <CgAttachment />
    //         <span className="text">Final Documents</span>
    //       </div>
    //     </div>
    //     <div className={`menu-item ${activeMenu === 'userinfo' ? 'active' : ''}`} onClick={() => navigate('userinfo')}>
    //       <div className="main-item">
    //         {/* <CgAttachment /> */}
    //         <GiProgression />
    //         <span className="text">Progress</span>
    //       </div>
    //     </div>
    //     <div className={`menu-item ${activeMenu === 'outsource' ? 'active' : ''}`} onClick={() => navigate('outsource')}>
    //       <div className="main-item">
    //         <IoArrowUndoOutline />
    //         <span className="text">Out Source</span>
    //       </div>
    //     </div>
    //     <div className={`menu-item ${activeMenu === 'Completion' ? 'active' : ''}`} onClick={() => navigate('Completion')}>
    //       <div className="main-item">
    //         <MdIncompleteCircle />
    //         <span className="text">Completion</span>
    //       </div>
    //     </div>
    //     <div className={`menu-item ${activeMenu === 'Print' ? 'active' : ''}`} onClick={() => navigate('comprint')}>
    //       <div className="main-item">
    //         <IoPrintOutline />
    //         <span className="text">Job Card</span>
    //       </div>
    //     </div>
    //     <div className={`menu-item ${activeMenu === 'email' ? 'active' : ''}`} onClick={() => navigate('compemail')}>
    //       <div className="main-item">
    //         <MdAttachEmail />
    //         <span className="text">Final Email</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Sidenav;
