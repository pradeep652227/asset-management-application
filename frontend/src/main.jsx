import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import * as Components from "./Components/import-components"
import * as pages from "./pages/import-pages";
import Layout from "./Components/Layout";
import { store } from "./features/store/store";
import { Provider } from "react-redux";
import Protected from "./Components/Protected";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Layout />}>
    <Route path="" element={<pages.Home />} />
    <Route path="login" element={<Protected authentication={false}><Components.Login /></Protected>} />
    <Route path="signup" element={<Protected authentication={false}><Components.Signup /></Protected>} />
    <Route path="create-an-asset" element={<Protected authentication={true}><Components.AssetForm /></Protected>} />
    <Route path="/assets" element={<Protected authentication><Components.Assets /></Protected>} />
    <Route path="/assets/:slug" element={<Protected authentication><Components.Asset /></Protected>} />
    <Route path="edit-asset/:slug" element={<Protected authentication><pages.EditAsset /></Protected>} />
  </Route>)
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
