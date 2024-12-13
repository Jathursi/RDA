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
const Sidenav = () => {
  const navigate = useNavigate();
  const [sidebarActive, setSidebarActive] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null); // Track the active menu

  const handleMenuClick = (menuKey) => {
    setActiveMenu((prevMenu) => (prevMenu === menuKey ? null : menuKey));
  };

  const handleSidebarToggle = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className="">
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <div className={`menu-item ${activeMenu === 'Implement' ? 'active' : ''}`} onClick={() => handleMenuClick('Implement')}>
          <div className="main-item">
            <IoIosArrowForward />
            <span className="text">Implement</span>
          </div>
            {activeMenu === 'Implement' && (
            <div className="sub-menu">
                <div className="sub-item" onClick={()=> navigate('implement')}>
                    <RiMoneyDollarCircleFill />
                    <span className="text">Implement</span>
                </div>
                <div className="sub-item" onClick={() => navigate('other')}>
                    <MdAttachMoney />
                    <span className="text">Other cost</span>
                </div>
            </div>
            )}
        </div>
        <div className={`menu-item ${activeMenu === 'Estimation' ? 'active' : ''}`} onClick={() => handleMenuClick('Estimation')}>
          <div className="main-item">
            <IoIosArrowForward />
            <span className="text">Estimation</span>
          </div>
            {activeMenu === 'Estimation' && (
            <div className="sub-menu">
                <div className="sub-item" onClick={() => navigate('estimation')}>
                    <MdAttachMoney />
                    <span className="text">Estimation</span>
                </div>
                <div className="sub-item" onClick={() => navigate('supliment')}>
                    <RiMoneyDollarCircleFill />
                    <span className="text">Suppliment</span>
                </div>
            </div>
            )}
        </div>
        <div className={`menu-item ${activeMenu === 'image' ? 'active' : ''}`} onClick={() => navigate('image')}>
          <div className="main-item">
            <IoImages />
            <span className="text">Image</span>
          </div>
        </div>
        <div className={`menu-item ${activeMenu === 'attachment' ? 'active' : ''}`} onClick={() => navigate('attachment')}>
          <div className="main-item">
            <CgAttachment />
            <span className="text">Attachment</span>
          </div>
        </div>
        <div className={`menu-item ${activeMenu === 'outsource' ? 'active' : ''}`} onClick={() => navigate('outsource')}>
          <div className="main-item">
            <IoArrowUndoOutline />
            <span className="text">Out Source</span>
          </div>
        </div>
        <div className={`menu-item ${activeMenu === 'Completion' ? 'active' : ''}`} onClick={() => navigate('Completion')}>
          <div className="main-item">
            <MdIncompleteCircle />
            <span className="text">Completion</span>
          </div>
        </div>
        <div className={`menu-item ${activeMenu === 'Print' ? 'active' : ''}`} onClick={() => handleMenuClick('Print')}>
          <div className="main-item">
            <IoIosArrowForward />
            <span className="text">Print</span>
          </div>
            {activeMenu === 'Print' && (
            <div className="sub-menu">
                <div className="sub-item" onClick={() => navigate('estprint')}>
                    <IoPrint />
                    <span className="text">Estimation</span>
                </div>
                <div className="sub-item" onClick={()=>navigate('comprint')}>
                    <IoPrintOutline />
                    <span className="text">Job Card</span>
                </div>
            </div>
            )}
        </div>
        <div className={`menu-item ${activeMenu === 'email' ? 'active' : ''}`} onClick={() => handleMenuClick('email')}>
          <div className="main-item">
            <IoIosArrowForward />
            <span className="text">Email</span>
          </div>
            {activeMenu === 'email' && (
            <div className="sub-menu">
                <div className="sub-item" onClick={()=>navigate('estemail')}>
                    <MdEmail />
                    <span className="text">Estimation</span>
                </div>
                <div className="sub-item" onClick={()=>navigate('compemail')}>
                    <MdAttachEmail />
                    <span className="text">Completion</span>
                </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
