import React from 'react'
import { useNavigate } from 'react-router-dom'
// import {FaBars} from 'react-icons/fa'
function Topuser() {
    const navigate = useNavigate();
  return (
    <nav
        className="navbar px-3 navbar-expand-sm shadow-sm"
    >
        <div>RDA</div>
        
        <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <div className='nav-link d-flex align-items-center fs-6 me-3' onClick={() => navigate('userdet')}>
                        {/* <span className="brand-name fs-5">Home</span> */}
                        Home
                    </div>
                </li>
                <li className="nav-item">
                    <div className='nav-link d-flex align-items-center fs-6 me-3' onClick={() => navigate('userfeed')}>
                        {/* <span className="brand-name fs-5">Home</span> */}
                        Feedback
                    </div>
                </li>
                <li className="nav-item">
                    <div className='nav-link d-flex align-items-center fs-6 me-3' onClick={() => navigate('/')}>
                        {/* <span className="brand-name fs-5">Home</span> */}
                        Logout
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    
  )
}

export default Topuser