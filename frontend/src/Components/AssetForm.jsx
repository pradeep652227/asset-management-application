/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "./Reusables/Input";
import axios from "axios";
import { addAsset, removeAsset } from "../features/assetSlice";
import { useNavigate } from "react-router-dom";

function AssetForm({ Asset }) {
  const user_details = useSelector((state) => state.auth.user_details);
  const assets = useSelector((state) => state.assets.assets);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [error, setError] = useState(false);
  
  const [formData, setFormData] = useState({
    name: Asset?.name || "",
    quantity: Asset?.quantity || "",
    createdBy: Asset?.createdBy || user_details.email,
    user_role: Asset?.user_role || user_details.user_role,
    category: Asset?.category || "",
    renewalDate: formatDate(Asset?.renewalDate || "") ,
    price: Asset?.price || "",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4 text-xl font-bold">
            {!Asset ? "Create" : "Edit"} Asset
          </h2>
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={Asset?true:false}
          />
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
          />
          <Input
            label="Created By"
            name="createdBy"
            value={formData.createdBy}
            readOnly
          />
          <Input
            label="User Role"
            name="user_role"
            value={formData.user_role}
            readOnly
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select category</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <Input
            label="Renewal Date"
            name="renewalDate"
            type="date"
            value={formData.renewalDate}
            onChange={handleChange}
          />
          <Input
            label="Price (in Rupees)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          {error && <p className="text-rose-900 text-md">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {!Asset ? "Submit" : "Save!!"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  function formatDate(date){
    if(!date){
      return "";
    }
    const d=new Date(date);
    const month=`${d.getMonth()+1}`.padStart(2,'0');//it'll pad 0 to the left of string to make it of 02 length(4->04);
    const day=`${d.getDate()}`.padStart(2,'0');
    const year=`${d.getFullYear()}`;

    return `${year}-${month}-${day}`;
  }
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Asset) {
      //edit the asset
      axios
        .patch("/api/update-asset", formData)
        .then((result) => {
          if (result) {
            //remove the current asset
            const updatedAsset={...Asset,...formData};
            dispatch(removeAsset(Asset._id));
            //add the updated asset
            dispatch(addAsset(updatedAsset));
          } else {
            alert(
              "The Current Asset can't be Updated right now. Please try again later"
            );
          }
          navigateTo("/assets");
        })
        .catch((err) => {
          setError(
            err.response?.data?.error_msg ||
              "Error in Updating this Asset.\nPlease try again later or contact the Dev."
          );
        });
    } else {
      //create a new asset
      axios
        .post("/api/create-asset-server", formData)
        .then((result) => {
          if (result) {
            dispatch(addAsset(result.data));
          } else {
            alert(
              "The New Asset can't be fetched right now. Please try again later"
            );
          }
          navigateTo("/assets");
        })
        .catch((err) => {
          setError(
            err.response?.data?.error_msg ||
              "Error in Creating an Asset.\nPlease try again later or contact the Dev."
          );
        });
    }
  }
}

export default AssetForm;
