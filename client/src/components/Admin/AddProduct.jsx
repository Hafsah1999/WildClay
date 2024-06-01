import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
const addProductSchema = Yup.object().shape({});

import { enqueueSnackbar } from 'notistack';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { FaRegUser } from 'react-icons/fa6';

const Addproduct = () => {

  const Navigate = useNavigate();
  const [selFile, setSelFile] = useState("");

  const addForm = useFormik({
    initialValues: {
      pname: "",
      pdetail: "",
      pprice: "",
      pcategory: "",
      image: "",
    },

    onSubmit: async (values, action) => {
      values.image = selFile;
      console.log(values);
      const res = await fetch("http://localhost:5000/product/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json" },
      });
      console.log(res.status);
      action.resetForm();
      if (res.status === 200) {
        enqueueSnackbar("Item uploaded successfully", { variant: "success" })
        Navigate("/Admin/manageProduct")
      }
      else {
        enqueueSnackbar("Something went wrong", { variant: "error" })
      }
    },
    validationSchema: addProductSchema,

  });

  const uploadFile = async (e) => {
    let file = e.target.files[0];
    setSelFile(file.name);
    const fd = new FormData();
    fd.append('myfile', file);

    const res = await fetch('http://localhost:5000/util/uploadfile', {
      method: 'POST',
      body: fd
    })
    console.log(res.status);
  }





  return (
    <>


<div>
        
        {/* source https://gist.github.com/dsursulino/369a0998c0fc8c25e19962bce729674f */}
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet"
        />
        <div className="bg-orange-200 min-h-screen">
         
          <div className="flex flex-row pt-8 px-10 pb-4">
          <div className="w-2/12 fixed mr-6">
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
           
      
      
            <div className="min-h-screen bg-gray-100 mx-auto p-0 sm:p-12">
        <div className="mx-auto max-w-md   bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 className="text-2xl text-center py-2 hover:bg-orange-700 font-serif text-white bg-orange-900 font-bold mb-8">Add Product</h1>
          <form id="form" className='px-12' onSubmit={addForm.handleSubmit}>
            <div className=" z-0 w-full mb-5">
            <label
               
               className="duration-300 top-3 -z-1 origin-0 text-gray-500"
             >
               Product Name
             </label>
              <input
                type="text"
                name="product"
                placeholder=" " 
                value={addForm.values.product}
                onChange={addForm.handleChange}
                required
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
          
            
            </div>
            <div className=" z-0 w-full mb-5">
            <label
               
               className=" duration-300 top-3 -z-1 origin-0 text-gray-500"
             >
               Category
             </label>
              <input
                type="text"
                name="category"
                placeholder=" "
                value={addForm.values.category}
                onChange={addForm.handleChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
           
              <span className="text-sm text-red-600 hidden" id="error">
                Category is required
              </span>
            </div>
            <div className="  z-0 w-full mb-5">
            <label
                htmlFor="description"
                className="  duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Enter Description
              </label>
              <textarea
                type="text"
                name="description"
                value={addForm.values.description}
                onChange={addForm.handleChange}
               required
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
           
            
            </div>


            <div className="flex flex-row space-x-4">
              <div className="  z-0 w-full mb-5">
              <label
                  htmlFor="price"
                  className="  duration-300 top-3 -z-1 origin-0 text-gray-500"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={addForm.values.price}
                  onChange={addForm.handleChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
            
               
              </div>
              <div className="  z-0 w-full">
              <label
                  htmlFor="originalprice"
                  className="  duration-300 top-3 -z-1 origin-0 text-gray-500"
                >
                  Orginial Price
                </label>
                <input
                  type="text"
                  name="originalprice"
                  placeholder=" "
                  onChange={addForm.handleChange}
                  value={addForm.values.originalprice}
                  required
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              
              </div>
            </div>

            <div className="  z-0 w-full mb-5">
              <input
                type="file"
                name="image"
                placeholder=" "
                onChange={uploadFile}
                className="pt-3 pb-2 pr-12 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />

            </div>
            <button
              type="submit"
              className="w-full px-6 mb-10 py-1 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow font-serif outline-none bg-orange-900 hover:bg-orange-700 hover:shadow-lg focus:outline-none"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
      
      
          </div>
        </div>
      
      
          </div>

    




    </>
  )
}


export default Addproduct