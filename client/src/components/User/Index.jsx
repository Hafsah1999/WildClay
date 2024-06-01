import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Main/Navbar'

const User = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    
    </>
  )
}

export default User