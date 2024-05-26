/* eslint-disable react/prop-types */
import React from 'react';

const Input = ({ label, className, type = 'text', ...props }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        type={type}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
