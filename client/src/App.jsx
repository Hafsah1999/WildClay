import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
// import Header from './components/Header'
import Addproduct from './components/Admin/AddProduct'
// import Dashboard from './components/Admin/Dashboard'
import Decoration from './components/Main/Decoration'
import Footer from './components/Footer'
import Product from './components/Main/Product'
import Showpiece from './components/Main/Showpiece'
import Utensil from './components/Main/Utensil'
import ViewProduct from './components/Main/ViewProduct'
import Watercontainer from './components/Main/Watercontainer'
import About from './components/Main/About'
import Home from './components/Home'

import Login from './components/Main/Login'
import UpdateProduct from './components/Admin/UpdateProduct'
import Signup from './components/Main/Signup'
import Feedback from './components/Main/Feedback'
import PageNotFound from './components/PageNotFound'
import Contact from './components/Main/Contact'
import { AppProvider } from './Context/AppContext'

import ManageProduct from './components/Admin/ManageProduct'

import Dashboard from './components/Admin/Dashboard'
import Main from './components/Main/Index'
import { SnackbarProvider } from 'notistack'
import { VoiceProvider } from './Context/voiceContext'
import User from './components/User/Index'
import Profile from './components/User/Profile'
import ManageUser from './components/Admin/ManageUser'
import Checkout from './components/User/Checkout'
import ThankYou from './components/User/Thankyou'
import OrderHistory from './components/User/Orders'
import { CartProvider } from './Context/CartContext'
import AdminAuth from './Auth/Adminauth'
import UserAuth from './Auth/Userauth'
import Cart from './components/Cart'
// import Dashboard from '../components/Admin/Dashboard'



const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
            <VoiceProvider>
              <SnackbarProvider>
                {/* <Header /> */}

                <Routes >
                  <Route path="/" element={<Home />} />

                  <Route path="/cart" element={<Cart />} />

                  <Route path="/About" element={<About />} />
                  <Route path="/Decoration" element={<Decoration />} />
                  <Route path="/Feedback" element={<Feedback />} />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/Showpiece" element={<Showpiece />} />
                  <Route path="/Utensil" element={<Utensil />} />
                  <Route path="/WaterContainer" element={<Watercontainer />} />

                  <Route path="/Admin" element={<AdminAuth><Main /></AdminAuth>}>
                    <Route path='ManageProduct' element={<ManageProduct />} />
                    <Route path='Dashboard' element={<Dashboard />} />
                    <Route path='manageProduct' element={<ManageProduct />} />
                    <Route path="AddProduct" element={<Addproduct />} />
                    <Route path="ManageUser" element={<ManageUser />} />
                    <Route path="UpdateProduct/:id" element={<UpdateProduct />} />
                  </Route>

                  <Route path="/Main" element={<Main />}>
                    <Route path="product" element={<Product />} />
                    <Route path="viewProduct/:id" element={<ViewProduct />} />

                    <Route path="Login" element={<Login />} />
                    <Route path="Signup" element={<Signup />} />
                    <Route path="About" element={<About />} />


                  </Route>

                  <Route path="/User" element={<UserAuth><User /></UserAuth>}>
                    <Route path="Profile" element={<Profile />} />
                    <Route path="Checkout" element={<Checkout />} />
                <Route path="thankyou" element={<ThankYou />} />
                <Route path="Order" element={<OrderHistory />} />


                  </Route>

                  <Route path="/Contact" element={<Contact />} />

                </Routes>
                <Footer />
              </SnackbarProvider>
            </VoiceProvider>
          </CartProvider>
        </AppProvider>
      </BrowserRouter>
    </>
  )
}

export default App