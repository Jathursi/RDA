import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Logins/Signup'
import Logins from './Logins/Logins'
import Forgotpassword from './Logins/Forgotpassword'
import Home from './Home/Home'
import Main from './HomeOutlets/Main'
import Feedback from './HomeOutlets/Feedback'
import Regist from './HomeOutlets/Regist'
import Entroll from './HomeOutlets/Entroll'
import Dash from './Dash/Dash'
import Details from './HomeOutlets/Details'
import Image from './DashOutlets/Image'
import Implement from './DashOutlets/Implement'
import Other from './DashOutlets/Other'
import Estimation from './DashOutlets/Estimation'
import Supliment from './DashOutlets/Supliment'
import Attachment from './DashOutlets/Attachment'
import Outsource from './DashOutlets/Outsource'
import Comprint from './DashOutlets/Comprint'
import Completion from './DashOutlets/Completion'
import EstPrint from './DashOutlets/EstPrint'
import Estemail from './DashOutlets/Estemail'
import UserInfo from './DashOutlets/UserInfo'
import CompEmail from './DashOutlets/CompEmail'
// import Comprint from './DashOutlets/Comprint'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <div className='APP'>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpassword' element={<Forgotpassword />} />
          <Route path='/' element={<Logins />} />
          <Route path='/dash/:id' element={<Dash />}>
            <Route index element={<Navigate to='estimation' />} />
            <Route path='image' element={<Image />} />
            <Route path='implement' element={<Implement />} />
            <Route path='other' element={<Other />} />
            <Route path='estimation' element={<Estimation />} />
            <Route path='supliment' element={<Supliment />} />
            <Route path='attachment' element={<Attachment />} />
            <Route path='outsource' element={<Outsource />} />
            <Route path='compemail' element={<CompEmail />} />
            <Route path='comprint' element={<Comprint />} />
            <Route path='completion' element={<Completion />} />
            <Route path='estprint' element={<EstPrint />} />
            <Route path='estemail' element={<Estemail />} />
            <Route path='userinfo' element={<UserInfo />} />
            <Route path='compemail' element={<CompEmail />} />
            <Route path='comprint' element={<Comprint />} />
          </Route>
          {/* <Route path='/home' element={<Navigate to={'main'} />} /> */}
          <Route path='/home' element={<Home />}>
            <Route index element={<Navigate to='main' />} /> 
            <Route path='main' element={<Main />} />
            <Route path='feedback' element={<Feedback />} />
            <Route path='regist' element={<Regist />} />
            <Route path='entroll' element={<Entroll />} />
            <Route path='details/:id' element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App