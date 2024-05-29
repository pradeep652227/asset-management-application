import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "./import-components";
export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error,setError]=useState(null);

  const navigateTo=useNavigate();
  const dispatch=useDispatch();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-xl font-bold">Login</h2>
          <Input
            label="Email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          {{error} && <p className="text-center text-rose-900">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("/api/login-server",loginData)
         .then(result=>{
            if(result.data){
                 dispatch(login(result.data));
                 navigateTo("/");
            }
            else
                setError('Incorrect User Credentials!!\nKindly check the details or contact Developer if the details are correct')
         })
         .catch(err=>{
                setError(err.response?.data?.error_msg || 'Problem with the backend. Kindly contact the developer.');
         });
  }
}
