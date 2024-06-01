import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
// import Header from './components/Header'
import Addproduct from './components/Admin/AddProduct'
// import Dashboard from './components/Admin/Dashboard'
import CartDetails from './components/User/Cart'
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
import { CartProvider } from './Context/cartContext'
import Main from './components/Main/Index'
import { SnackbarProvider } from 'notistack'
import { VoiceProvider } from './Context/voiceContext'
import User from './components/User/Index'
import Cart from './components/User/Cart'
import Profile from './components/User/Profile'
import ManageUser from './components/Admin/ManageUser'
import Checkout from './components/User/Checkout'
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
                  <Route path="/CartDetails" element={<CartDetails />} />


                  <Route path="/About" element={<About />} />
                  <Route path="/Decoration" element={<Decoration />} />
                  <Route path="/Feedback" element={<Feedback />} />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/Showpiece" element={<Showpiece />} />
                  <Route path="/Utensil" element={<Utensil />} />
                  <Route path="/WaterContainer" element={<Watercontainer />} />

                  <Route path="/Admin" element={<Main />}>
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

                  <Route path="/User" element={<User />}>
                    <Route path="cart" element={<Cart />} />
                    <Route path="Profile" element={<Profile />} />
                    <Route path="Checkout" element={<Checkout />} />
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