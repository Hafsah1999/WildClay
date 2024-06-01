import React from 'react'
import { useFormik } from "formik"
import { enqueueSnackbar } from "notistack"
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

const Signup = () => {

    const navigate = useNavigate();

    const signupForm = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            avatar: "",
            password: "",
            cpassword: ""
        },

        onSubmit: async (values) => {
            console.log(values);

            const res = await fetch("http://localhost:5000/user/add", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                },


            })
            console.log(res.status);
            if (res.status === 200) {
                enqueueSnackbar("user Added Successfully", { variant: "success" })
                navigate("/Main/Login")
            } else {
                enqueueSnackbar("somthing went wrong", { variant: "warning" })
            }
        }
    });

    const uploadFile = (e) => {
        const file = e.target.files[0];
        console.log(file);
        const fd = new FormData();
        fd.append('myfile', file);
        fetch('http://localhost:5000/util/uploadfile', {
            method: 'POST',
            body: fd

        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Photo Upload');
                    response.json()
                        .then((data) => {
                            signupForm.values.avatar = data.savedFile;
                        })
                } else {
                    toast.error('some error occured')
                }
            }).catch((err) => {
                console.log(err);
                toast.error('some error occured')
            });
    }

    return (
        <>

            <>
                {/* component */}

                <section className="bg-orange-200 min-h-screen flex box-border justify-center items-center">

                    <div className="shadow-2xl rounded-2xl flex max-w-3xl p-5 items-center">
                        <div className="md:block hidden w-1/2">
                            <img
                                className="rounded-2xl max-h-[1600px]"
                                src="https://static.vecteezy.com/system/resources/previews/001/962/632/non_2x/cartoon-character-boy-making-pottery-clay-on-white-background-free-vector.jpg"
                                alt="login form image"
                            />
                        </div>
                        <div className="md:w-3/4 px-8">
                            <h2 className="font-bold text-3xl text-orange-900 font-serif mx-3">Register</h2>
                            <p className="text-sm mt-4 mb-3 text-orange-900 mx-3">
                                If you are a new member, easily register now.
                            </p>
                            <form onSubmit={signupForm.handleSubmit} className="flex flex-col gap-4">
                                <div className="flex">
                                    <div className="flex me-2 w-1/2">
                                        <div className="w-full px-3 ">
                                            <label htmlFor="" className="text-xs font-semibold px-1">
                                                First Name
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <FaRegUser className='text-gray-400' />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 "
                                                    placeholder="John"
                                                    id="firstname"
                                                    required
                                                    value={signupForm.values.firstname}
                                                    onChange={signupForm.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex -mx-3 w-1/2">
                                        <div className="w-full px-3 ">
                                            <label htmlFor="" className="text-xs font-semibold px-1">
                                                Last Name
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <FaRegUser className='text-gray-400' />

                                                </div>
                                                <input
                                                    type="text"
                                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                    placeholder="Doe"
                                                    id="lastname"
                                                    required
                                                    value={signupForm.values.lastname}
                                                    onChange={signupForm.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mx-3">
                                        <label htmlFor="" className="text-xs font-semibold px-1">
                                            Email
                                        </label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <MdOutlineMail className='text-gray-400 text-xl' />
                                            </div>
                                            <input
                                                type="email"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                placeholder="john@example.com"
                                                id="email"
                                                required
                                                value={signupForm.values.email}
                                                onChange={signupForm.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex  w-1/2">
                                        <div className="w-full px-3 mb-3">
                                            <label htmlFor="" className="text-xs font-semibold px-1">
                                                Password
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <CiLock className='text-xl text-gray-500' />
                                                </div>
                                                <input
                                                    type="password"
                                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 "
                                                    placeholder="************"
                                                    id="password"
                                                    required
                                                    value={signupForm.values.password}
                                                    onChange={signupForm.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex  w-1/2">
                                        <div className="w-full px-3 mb-3">
                                            <label htmlFor="" className="text-xs font-semibold px-1">
                                                Confirm Password
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <CiLock className='text-xl text-gray-500' />

                                                </div>
                                                <input
                                                    type="password"
                                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                    placeholder="***********"
                                                    id="cpassword"
                                                    required
                                                    value={signupForm.values.cpassword}
                                                    onChange={signupForm.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="bg-orange-900 text-white py-2 mx-2 rounded-xl hover:scale-105 duration-300 hover:bg-orange-700 font-medium"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </form>



                            <div className="mt-4 text-sm flex justify-between items-center container-mr">
                                <p className="mr-3 md:mr-0 ">If you don't have an account..</p>
                                <Link to="/Main/Login" className="text-white bg-orange-900 hover:border-orange-700 rounded-xl py-2 px-5 hover:scale-105 hover:bg-orange-700 font-semibold duration-300">
                                    Login
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>

            </>





        </>
    )
}

export default Signup