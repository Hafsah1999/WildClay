import { useState, useEffect } from "react"
import UpdateProduct from "./UpdateProduct";
import { Link } from "react-router-dom";

import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";

const Manage = () => {
    const [Data, setData] = useState([]);


    //User fetch func
    const fetchUserData = async () => {
        const res = await fetch('http://localhost:5000/product/getall');

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

        const res = await fetch('http://localhost:5000/product/delete/' + id, { method: 'DELETE' })

        if (res.status === 200) {
            fetchUserData();
        }
    }


    //User Display func
    const displayUsers = () => {
        return Data.map((obj) => (
            <>
                    <tr>
                   
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-orange-700 ">
                  <img className="w-24" src={"http://localhost:5000/" + obj.image} alt="" />
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-orange-700 ">
                  {obj.pname}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                  {obj.pprice}
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  {obj.originalprice}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  {obj.pcategory}
                </td>
                <td className="p-2 whitespace-nowrap">
               
               <button className="bg-red-700 text-white px-3  rounded" onClick={() => {deleteFuction(obj._id)}}>Delete</button>
         
         </td>
         <td>
            <Link to={"/Admin/UpdateProduct/" + obj._id }>
                <button className="bg-green-800 rounded text-white px-3">Update</button>
            </Link>
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
           
      
            <section className="py-1 bg-orange-100 ">
    <div className="w-full lg:w/3/4 mb-12 xl:mb-0 overflow-auto h-96">
      <div className="relative flex flex-col min-w-0   break-words bg-white w-full mb-6 shadow-lg rounded ">
       
        <div className="block w-full py-5 px-2 overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-orange-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Image
                </th>
                <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-orange-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Product name
                </th>
                <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-orange-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Price
                </th>
                <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-orange-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Original Price
                </th>
                <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-orange-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Category
                </th>
                <th className="px-6 bg-orange-50 text-orange-500 align-middle border border-solid border-orange-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  edit
                </th>
              </tr>
            </thead>
            <tbody>
          {displayUsers()}
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
<div className="mt-4 mx-5">
<Link to="/admin/AddProduct"
                className="bg-orange-800  text-lg text-white active:bg-orange-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              > Add Product
              </Link>
</div>
  </section>
      
      
      
          </div>
          
        </div>
      
      
          </div>

 
</>

      </>
      
    )
}

export default Manage