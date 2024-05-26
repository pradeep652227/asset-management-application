/* eslint-disable react/prop-types */
import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Loading } from "./import-components";
import { useNavigate } from "react-router-dom";

export default function Protected({children,authentication=true}){
    const isLogged=useSelector(state=>state.auth.isLogged);
    const [loader,setLoader]=useState(true);
    const navigateTo=useNavigate();

    useEffect(()=>{
        if (authentication && !isLogged) {
            alert('Protect Route. Login First');
            navigateTo("/login");
          } else if (!authentication && isLogged) {
            navigateTo("/");
          }
        setLoader(false);
    },[authentication,navigateTo,isLogged])
    return(
        
            loader?<Loading /> : <>{children}</>
        
    );
}