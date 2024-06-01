import { Link, NavLink, useLocation } from "react-router-dom"
import { LuUserCircle2 } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Logo from '../assets/Logo2.png'
import useCartContext from "../Context/cartContext";
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Header = () => {

    const { getCartItemsCount } = useCartContext();


    const [showMenu, setshowMenu] = useState(false)
    const handleShowMenu = () => {
        setshowMenu(preve => !preve)
    }

    //Logic for navbar hide from some components
    const location = useLocation();

    // Specify the paths where you want to hide the Navbar
    const hideNavbarPaths = ['/Login', '/Signup', '/Admin', '/Filters', '/Feedback', '/Admin/ManageProduct', '/Admin/Dashboard'];

    // Check if the current path is in the hideNavbarPaths array
    const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

    // Render Navbar only if shouldHideNavbar is false
    return shouldHideNavbar ? null : (

        <>
            <header className="fixed shadow-md  w-full h-14 px-4  md:px-4 z-50 bg-white">
                <div className="flex items-center   h-full justify-between">
                    <div className="h-12">
                        <Link to="/admin/ManageProduct" className="nav-link">
                            <img style={{ width: "140px" }} className="h-12" src={Logo} alt="" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 md:gap-7">
                        <nav className="flex gap-4 md:gap-7 text-base md:text-lg">
                            <Link to="/" className="text-red-600 fw-bold fs-4 hover:text-blue-500 " style={{ fontFamily: "serif" }}>Home</Link>

                            <Link to="/Product" className="text-red-600 fw-bold fs-4 hover:text-blue-500 " style={{ fontFamily: "serif" }}>Product</Link>
                            <Link to="/About" className="text-red-600 fw-bold fs-4 hover:text-blue-500 " style={{ fontFamily: "serif" }}>About</Link>

                            <Link to="/Contact" className="text-red-600 fw-bold fs-4 hover:text-blue-500 " style={{ fontFamily: "serif" }}>Contact</Link>
                            <Link to="CartDetails"> <button

                                className="block  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

                            >
                                <p className='d-flex'>
                                    <span> <AiOutlineShoppingCart className='text-red-600 fw-bold fs-4 hover:text-blue-500' /></span>
                                    <span className='badge badge-notification bg-danger  rounded text-white px-1 py-1' style={{ fontSize: "10px" }}>{getCartItemsCount()}</span></p>
                            </button></Link>
                        </nav>
                    </div>



                    <div className="flex">
                        {/* <NavLink to="/CartDetails" className="text-2xl text-slate-600 relative  hover:text-blue-500 ">
                            <FaShoppingCart className="text-red-600 mx-3    " />
                            {carts.length > 0 && (
                                <span className="absolute top-0 right-0  bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {carts.length}
                                </span>
                            )}
                        </NavLink> */}


                        <div className=" text-slate-600" onClick={handleShowMenu}>
                            <div className="text-2xl cursor-pointer">
                                <LuUserCircle2 className="text-slate-600 fw-bold fs-3 hover:text-blue-500 " />

                            </div>
                            {showMenu &&
                                <div className="absolute right-0 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                                    <Link to="Signup" className="whitespace-nowrap cursor-pointer text-grey fw-bold fs-5 hover:text-blue-500 " style={{ fontFamily: "serif" }}>
                                        Sign up
                                    </Link>
                                    <Link to="/Login" className="whitespace-nowrap cursor-pointer text-grey fw-bold fs-5 hover:text-blue-500 " style={{ fontFamily: "serif" }}>Login</Link>

                                </div>
                            }

                        </div>
                    </div>

                </div>
            </header>
        </>
    )
}

export default Header