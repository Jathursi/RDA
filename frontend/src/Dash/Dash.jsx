import React from 'react'
import DashTopnav from './DashTopnav'
import Sidenav from './Sidenav'
import { Outlet } from 'react-router-dom'
function Dash() {
  return (
    <div className='dash'>
        <div className='dash-bottom'>
                <DashTopnav />
            <div>
                <Sidenav />
            </div>
            <div className='dash-main'>
                <div className='maindash'>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dash