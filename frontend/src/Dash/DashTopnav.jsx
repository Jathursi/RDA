import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import img from '../Assets/log.png'
function DashTopnav() {
    const navigate = useNavigate()
  return (
    <div className="top-wrapper-dash">
      <div className="wrapper-dash">
        <div className="topbar-dash">
          <div className="topbar-dash-left">
            <div className='header'>
              <img className='logo' src={img} alt='logo' />
                <h1>RDA</h1>
            </div>
          </div>
          <div className="topbar-dash-right">
            <button className='top-dash-items' onClick={() => navigate('/home')}> Home </button>
            <button className="top-dash-items" onClick={() => navigate('/')}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashTopnav