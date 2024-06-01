import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { HiMiniShoppingBag } from 'react-icons/hi2'
import { FaRegUser } from 'react-icons/fa6'

const Dashboard = () => {
  return (
    <div>
     <div>
        
        {/* source https://gist.github.com/dsursulino/369a0998c0fc8c25e19962bce729674f */}
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet"
        />
        <div className="bg-orange-200 min-h-screen">
         
          <div className="flex flex-row pt-8 px-10 pb-4">
            <div className="w-2/12 mr-6">
              <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
              <Link to='/admin/dashboard'
                  className="inline-block text-gray-600 hover:text-black my-4 w-full"
                >
                  <span className="material-icons-outlined float-left pr-2">
                    dashboard
                  </span>
                Dashboard
                  <span className="material-icons-outlined float-right">
                    keyboard_arrow_right
                  </span>
                </Link>
                <Link to="/admin/ManageProduct"
                  className="inline-block text-gray-600 hover:text-black my-4 w-full"
                >
                  <span className="material-icons-outlined float-left pr-2">
                    <HiMiniShoppingBag />
                  </span>
                  Product
                  <span className="material-icons-outlined float-right">
                    keyboard_arrow_right
                  </span>
                </Link>
                <Link
                  to="/Admin/ManageUser"
                  className="inline-block text-gray-600 hover:text-black my-4 w-full"
                >
                  <span className="material-icons-outlined float-left pr-2">
                   <FaRegUser />
                  </span>
                 User
                  <span className="material-icons-outlined float-right">
                    keyboard_arrow_right
                  </span>
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
          
                <Link
                  to="/"
                  className="inline-block text-gray-600 hover:text-black my-4 w-full"
                >
                  <span className="material-icons-outlined float-left pr-2">
                    power_settings_new
                  </span>
                  Log out
                  <span className="material-icons-outlined float-right">
                    keyboard_arrow_right
                  </span>
                </Link>
              </div>
            </div>
           
      
      
      
      
          </div>
          
        </div>
      
      
          </div>
    </div>
  )
}

export default Dashboard