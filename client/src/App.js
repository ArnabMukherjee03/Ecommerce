import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthAsync } from "./features/Auth/authSlice";
import {Toaster} from 'react-hot-toast';

// All Pages
import Product from "./pages/Product";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserProfilePage from "./pages/UserProfile";
import Footer from "./pages/Footer";
import UserAddress from "./pages/UserAddress";
import OrderSucess from "./pages/OrderSuccess";
import OrderPage from "./pages/OrderPage";
import Protected from "./pages/Protected Route/Protected";
import IsUser from "./pages/Protected Route/IsUser";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    <>
      <Toaster
       position="top-right"
      
      />
      <Nav />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products/:type" Component={Product}></Route>
        <Route path="product/:id" Component={SingleProduct}></Route>
        <Route path="/login" element={<IsUser><Signin/></IsUser>} />
        <Route path="/signup" element={<IsUser><Signup/></IsUser>} />
        <Route path="/mycart" Component={CartPage}/>
        <Route path="/checkout" element={<Protected><CheckoutPage/></Protected>}/>
        <Route path="/account" element={<Protected><UserProfilePage/></Protected>}/>
        <Route path="/account/addresses" element={<Protected><UserAddress/></Protected>}/>
        <Route path="/account/orders" element={<Protected><OrderPage/></Protected>}/>
        <Route path="/ordersuccess/:id" element={<Protected><OrderSucess/></Protected>}/>
        <Route path="*" element={<div>No Page Exist</div>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
