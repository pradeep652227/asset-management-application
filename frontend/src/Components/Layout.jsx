import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./import-components";
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
