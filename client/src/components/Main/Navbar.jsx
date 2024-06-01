import React, { useEffect } from 'react'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom'
import { RiShoppingBagLine } from "react-icons/ri";
import useVoiceContext from '../../Context/voiceContext';
import useCartContext from '../../Context/cartContext';
import useAppContext from '../../Context/AppContext';
import { FaRegUser } from 'react-icons/fa6';
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  const { cartItems, cartOpen, setCartOpen } = useCartContext();
  const { finalTranscript, voiceResponse, resetTranscript } = useVoiceContext();
  useEffect(() => {
    if (finalTranscript.includes('open card') || finalTranscript.includes('open card')) {
      voiceResponse('Opening cart page.');
      setCartOpen(true);
      resetTranscript();
    }
    else if (finalTranscript.includes('close cart') || finalTranscript.includes('close card')) {
      voiceResponse('Closing cart page');
      setCartOpen(false);
      resetTranscript();
    }

  }, [finalTranscript])

  const { loggedIn, logout } = useAppContext();

  console.log(loggedIn);

  const showLoggedin = () => {
    if (loggedIn) {
      return (
        
        <button onClick={logout}>
          <TbLogout className='text-2xl text-gray-600' /></button>
      );
    } else {
      return <div className=" ">
        <Link className="" to="/Main/Login">
          <FaRegUser className='text-xl text-gray-600' />
        </Link>

      </div>
    }
  }




  return (
    <>
      {cartOpen && <CartPage />}
      <>
        {/* component */}
        <header className="bg-white">
          <div className="container mx-auto py-2 flex items-center">
            {/* logo */}
            <div className="mr-auto  md:w-48 flex-shrink-0">
            
            <Link to="/"> <img
                className="h-8 md:h-10"
                src={Logo}
                alt=""
              />
              </Link> 
            </div>
            {/* phone number */}
            <div className="ml-auto md:w-48  sm:flex flex-col place-items-end">
              <span className="font-semibold text-orange-900 md:text-lg">9876543210</span>
              <span className="font-semibold text-sm text-gray-400">
                Support 24/7
              </span>
            </div>
            {/* buttons */}
            <nav className="contents">
              <ul className="ml-4 xl:w-48 flex items-center justify-end">

                <li className="ml-2 lg:ml-4 relative inline-block">
                  <Link to="/Main/product">
                    <RiShoppingBagLine className='text-2xl text-gray-500' />
                  </Link>
                </li>



                <li className="ml-2 lg:ml-4 relative inline-block">
                  <Link className="" to="/User/cart">
                    <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                      {cartItems.length}
                    </div>
                    <svg
                      className="h-9 lg:h-10 p-2 text-gray-500"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="shopping-cart"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
                      />
                    </svg>
                  </Link>
                </li>
                <li className="ml-2 lg:ml-4 relative inline-block">
                  {showLoggedin()}
                </li>
              </ul>
            </nav>
          </div>
          <hr />
        </header>
      </>

    </>
  )
}

export default Navbar