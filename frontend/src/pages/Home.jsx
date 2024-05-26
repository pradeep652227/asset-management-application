import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../Components/import-components";
import { Link } from "react-router-dom";

export default function Home() {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <div className="min-h-screen py-48">
      <h1 className="text-3xl text-center">
        Manage Your Assets at One Place!!
      </h1>
      {!isLogged ? (
        <p className="text-xl text-center">
          Login now to create, edit, and manage your assets.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center mt-2">
             <Button className="border-2 bg-blue-400 text-3xl px-4 hover:bg-blue-200 duration-200 shadow-xl">
          <Link to="/assets">Assets</Link>
        </Button>
        </div>
       
      )}
    </div>
  );
}
