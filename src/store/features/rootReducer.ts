import { combineReducers } from "@reduxjs/toolkit";
import  LoaderSlice  from "./loaderSlice";
import cartReducer from "@/slices/cartSlice";
export const rootReducer 
  = combineReducers({
  loader: LoaderSlice,
  cart: cartReducer, 
});
