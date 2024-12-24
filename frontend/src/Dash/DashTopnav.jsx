import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
function DashTopnav({Toggle}) {
    const navigate = useNavigate();
  return (
    <nav
        className="navbar px-3 navbar-expand-sm m-2"
    >
        {/* <i className="navbar-brand" onClick={Toggle}>Navbar</i> */}
        <FaBars className='navbar-brand fs-4' onClick={Toggle} />
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"  aria-expanded="false" aria-label="Toggle navigation"
        ></button>
        {/* <form className="d-flex my-2 my-lg-0">
                <input
                    className="form-control me-sm-2"
                    type="text"
                    placeholder="Search"
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Search
                </button>
            </form> */}
        
        <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item">
                <div className='nav-link d-flex align-items-center fs-6 me-3' onClick={() => navigate('/home')}>
                    {/* <span className="brand-name fs-5">Home</span> */}
                    Home
                </div>
                </li>
            </ul>
        </div>
    </nav>
    
  )
}

export default DashTopnav