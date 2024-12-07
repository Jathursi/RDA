import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Logins/Signup'
import Logins from './Logins/Logins'
import Forgotpassword from './Logins/Forgotpassword'
import Dashboard from './Dash/Dashboard'
import Home from './Home/Home'
import Main from './HomeOutlets/Main'
import Feedback from './HomeOutlets/Feedback'
import Regist from './HomeOutlets/Regist'
import Entroll from './HomeOutlets/Entroll'
import Dash from './Dash/Dash'
import Details from './HomeOutlets/Details'

function App() {
  return (
    <div className='APP'>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpassword' element={<Forgotpassword />} />
          <Route path='/' element={<Logins/>} />
          <Route path='/dash' element={<Dash />} />
          <Route path='/home' element={<Navigate to={'main'} />}/>
          <Route path='/home' element={<Home />}>
            <Route path='main' element={<Main />} />
            <Route path='feedback' element={<Feedback />} />
            <Route path='regist' element={<Regist />} />
            <Route path='entroll' element={<Entroll />} />
            <Route path='details' element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App