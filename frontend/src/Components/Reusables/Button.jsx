/* eslint-disable react/prop-types */
import React from "react";

export default function Button({className="",children, ...props}){
    return(
        <>
            <button className={`border-2 p-2 rounded-xl ${className}`} {...props}>
                {children}
            </button>
        </>
    );
}