import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllProductsasync } from "./features/Product/productSlice";
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

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProductsasync());
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
        <Route path="/login" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/cart" Component={CartPage}/>
        <Route path="/checkout" Component={CheckoutPage}/>
        <Route path="/account" Component={UserProfilePage}/>
        <Route path="/account/addresses" Component={UserAddress}/>
        <Route path="/ordersuccess/:id" Component={OrderSucess}/>
        <Route path="*" element={<div>No Page Exist</div>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
