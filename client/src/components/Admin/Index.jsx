import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Admin = () => {
  return (
    <>

    <div className="grid grid-col-4">
      <div className="col-span-1">
      <Sidebar />

      </div>
      <div className="col-span-3">
      <Outlet />

      </div>
    </div>
    

    </>
  )
}

export default Admin