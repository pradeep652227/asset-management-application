import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./import-components";
import axios from "axios";
import { removeAsset } from "../features/assetSlice";

export default function Asset() {
  const { slug } = useParams();
  const asset = useSelector((state) =>
    state.assets.assets.find((asset) => asset.slug === slug)
  );
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  if (!asset) {
    return <div>Asset not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <h1 className="text-2xl font-bold mb-4 text-center">{asset.name}</h1>
        {error && <p className="text-rose-900 text-md text-center">{error}</p>}

      </div>

      <div className="flex flex-wrap flex-col gap-4 align-center">
        <p>
          <strong>Quantity:</strong> {asset.quantity}
        </p>
        <p>
          <strong>Created By:</strong> {asset.createdBy}
        </p>
        <p>
          <strong>Category:</strong> {asset.category}
        </p>
        <p>
          <strong>Renewal Date:</strong>{" "}
          {new Date(asset.renewalDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Price:</strong> {asset.price} Rupees
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(asset.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(asset.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <Button className="bg-blue-400 hover:shadow-md px-4" onClick={()=>navigateTo(`/edit-asset/${asset.slug}`)}>
            Edit
          </Button>
          <Button className="bg-rose-600 hover:shadow-md" onClick={handleDelete}>Delete</Button>
        </div>
    </div>
  );

  function handleDelete() {
    axios
      .delete("/api/delete-asset/" + asset._id)
      .then((res) => {
        if (res) {
          dispatch(removeAsset(asset._id));
          alert("Asset Deleted Successfully");
          navigateTo("/");
        } else {
          alert(`Asset can not be deleted`);
        }
      })
      .catch((err) => {
        setError(err.response?.data?.error_msg || "Error from the backend");
      });
  }
}
