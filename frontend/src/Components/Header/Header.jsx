import React from "react";
import { Logo, Button } from "../import-components";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { clearAssets } from "../../features/assetSlice";

export default function Header() {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch=useDispatch();
  const navigateTo=useNavigate();
  const options = [
    {
      name: "Home",
      to: "/",
      isVisible: true,
    },
    {
      name: "Login",
      to: "/login",
      isVisible: !isLogged,
    },
    {
      name: "Signup",
      to: "/signup",
      isVisible: !isLogged,
    },
    {
      name: "Create Asset",
      to: "/create-an-asset",
      isVisible: true,
    },
  ];
  return (
    <header id="main-header" className="bg-slate-200">
      <div className="flex flex-wrap justify-around py-4">
        <div>
          <Logo style={{width:"50px",height:"40px"}} className="rounded-md" />
        </div>
        <div className="flex flex-wrap gap- 2">
          <ul>
            {options.map((option) => (
              <>
                {" "}
                {option.isVisible && (
                  <Button className="bg-gray-400 py-1 border-2 hover:bg-gray-100 duration-200 text-xl">
                    <Link to={option.to}>
                      <li key={option.name}>{option.name}</li>
                    </Link>
                  </Button>
                )}
              </>
            ))}
            {isLogged && (
              <Button className="bg-gray-400 py-1 hover:bg-gray-100 duration-200 ml-2 text-xl">
              <li className="" onClick={()=>{dispatch(logout());dispatch(clearAssets()); navigateTo("/");}}>
               Logout
              </li>
              </Button>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
