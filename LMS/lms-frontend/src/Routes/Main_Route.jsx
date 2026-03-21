import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'

function Main_Route() {
  return (
    <div>

        <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default Main_Route