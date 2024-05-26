import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "../authSlice";
import assetReducer from "../assetSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        assets:assetReducer
    }
});

