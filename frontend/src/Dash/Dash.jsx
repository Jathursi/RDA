import React, {useState} from 'react'
import Sidenav from './Sidenav'
import DashMain from './DashMain';
function Dash() {
    const [toggle, setToggle] = useState(true);
    
      const Toggle = () => {
        setToggle(!toggle);
      };
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <div className="row flex-grow-1">
        {/* Sidebar */}
        {toggle && (
          <div className="col-2 g-0 bg-light min-vh-100">
            <Sidenav />
          </div>
        )}
        {/* Main Content */}
        <div className={`col ${toggle ? 'col-10' : 'col-12'} d-flex flex-column m-0 p-0`}>
          <DashMain Toggle={Toggle} />
        </div>
        {/* rightside bar */}
        
      </div>
    </div>
    // <div className='dash'>
    //     <div className='dash-bottom'>
    //         <div>
    //             <Sidenav />
    //         </div>
    //         <div className='dash-main'>
    //             <div className='maindash'>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  )
}

export default Dash