/* eslint-disable react/prop-types */
import React from "react";

export default function Logo({style,className="",...props}){
    const imgStyles={width:"70px",height:"60px",...style}
    return (
        <div className="logo" {...props}>
           <img src="https://cdn.pixabay.com/photo/2016/12/26/18/33/logo-1932539_1280.png" className={`${className}`} style={imgStyles}/>
        </div>
    );
}