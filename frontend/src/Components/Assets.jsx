import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { addAssetsArray } from "../features/assetSlice";
import Loading from "./Reusables/Loading";

export default function Assets() {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets.assets);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [assetsArray, setAssetsArray] = useState(assets);

  const [category, setCategory] = useState("default");
  const [categorisedAssets, setCategorisedAssets] = useState([]);
  useEffect(() => {
    setLoader(true);
    if (assets.length === 0) {
      axios
        .get("/api/assets-data")
        .then((result) => {
          console.log(result);
          dispatch(addAssetsArray(result.data));
          setAssetsArray(result.data);
        })
        .catch((err) => {
          setError(
            err.response?.data?.error_msg ||
              "Error in getting all the Assets array"
          );
        });
    } else {
      console.log("inside else");
      setAssetsArray(assets);
    }
    setLoader(false);
  }, []);

  useEffect(() => {
    if (category === "default") {
      setCategorisedAssets(assets);
    } else {
      setCategorisedAssets(
        assets.filter((asset) => asset.category === category && asset)
      );
    }
  }, [assets, category]);

  return loader ? (
    <Loading />
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assets</h1>
      <div>
        Select By Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="default">Default</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      {error && <p>{error}</p>}

      <div className="flex flex-wrap justify-center gap-4">
        {categorisedAssets.map((asset) => (
          <Link
            to={`/assets/${asset.slug}`}
            key={asset._id}
            className="block p-4 bg-white shadow rounded mb-4 hover:shadow-xl duration-200"
          >
            <h3 className="text-xl font-bold comfortaa">{asset.name}</h3>
            <p>Quantity: {asset.quantity}</p>
            <p>Price: {asset.price} Rupees</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
