import React, { useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa6';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const ManageUser = () => {
    const [Data, setData] = useState([]);


    //User fetch func
    const fetchUserData = async () => {
        const res = await fetch('http://localhost:5000/user/getall');

        console.log(res.status);
        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            setData(data);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    //Delete func
    const deleteFuction = async (id) => {
        console.log(id);

        const res = await fetch('http://localhost:5000/user/delete/' + id, { method: 'DELETE' })

        if (res.status === 200) {
            fetchUserData();
        }
    }


    //User Display func
    const displayUsers = () => {
        return Data.map((obj) => (
            <>
            <tr>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img
                          className="rounded-full"
                          src={"http://localhost:5000/" + obj.avatar}
                          width={40}
                          height={40}
                          alt="Alex Shatov"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        {obj.firstname} {obj.lastname}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{obj.email}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{obj.role}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      {obj.password}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
               
                        <button className="bg-red-700 text-white px-3  rounded" onClick={() => {deleteFuction(obj._id)}}>Delete</button>
                  
                  </td>
                  <td>
          
         </td>
                </tr>
            </>
        ))
    }

  return (
    <>
    <>
  {/* component */}

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
           
      
            <section className="antialiased bg-gray-100 text-gray-600 rounded-xl shadow px-4">
    <div className="flex flex-col justify-center h-full">
      {/* Table */}
      <div className="w-full max-w-2xl mx-auto bg-white ">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Customers</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Role</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Password</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Edit</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
               {displayUsers()}
             
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
      
      
      
          </div>
          
        </div>
      
      
          </div>


</>

    </>
  )
}

export default ManageUser