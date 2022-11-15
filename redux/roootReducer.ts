import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
// admin 
import userReducer from "./slice/admin/userSlice";
import  adminProductReducer from "./slice/admin/productSlice";
import buyReducer from "./slice/admin/buySlice";
import notificationReducer from "./slice/admin/notificationSlice";

export const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    adminProduct: adminProductReducer,
    user:userReducer,
    buy: buyReducer,
    notification: notificationReducer
});