import {configureStore} from "@reduxjs/toolkit";
import productReducer from "../features/Product/productSlice";
import authReducer from "../features/Auth/authSlice";
import cartReducer from '../features/Cart/cartSlice';
import userReducer from '../features/User/userSlice';
import addressReducer from '../features/Address/addressSlice';
import orderReducer from '../features/Orders/orderSlice';

export const store = configureStore({
    reducer: {
       product: productReducer,
       auth: authReducer,
       cart: cartReducer,
       user: userReducer,
       address: addressReducer,
       order: orderReducer
    }
})