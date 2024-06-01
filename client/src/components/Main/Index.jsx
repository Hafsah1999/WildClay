import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Main = () => {
  return (
    <>
    <Navbar />
   
   <div className='bg-orange-200'>
    <Outlet />
    </div>
    </>
  )
}

export default Main