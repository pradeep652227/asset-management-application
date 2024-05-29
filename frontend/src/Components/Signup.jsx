import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Input} from './import-components'

function Signup() {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    user_role:"",
    secret_code:"",
  })
  const [error,setError]=useState(null);
  const dispatch = useDispatch();
  const navigateTo=useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-xl font-bold">Signup</h2>
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_role">
              Role
            </label>
            <select
              id="user_role"
              name="user_role"
              value={formData.user_role}
              onChange={(e) => handleChange(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="dev">Developer</option>
              <option value="others">Others</option>
            </select>
          </div>
          <Input label="Secret Code (For Dev and Admin only)" name="secret_code" value={formData.secret_code} onChange={handleChange} />
          {{error} && <p className="text-center text-rose-900">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );

function handleChange(e){
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
}
  function handleSubmit(e){
    e.preventDefault();
    axios.post("/api/signup-server",formData)
          .then(result=>{
            console.log(result);
            if(result){
                dispatch(login(result.data));
                navigateTo("/");
            }else{
                setError('Error from the Server End. Kindly contact the Developer.');
            }
          })
          .catch(err=>{
            console.log(err);
            setError(err.response?.data?.error_msg || 'Error from the Server End. Kindly contact the Developer.');
          })
  }
}

export default Signup;
