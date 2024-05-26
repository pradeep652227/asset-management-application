import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: JSON.parse(sessionStorage.getItem("assets")) || [],
};

export const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addAssetsArray: (state, action) => {
      sessionStorage.setItem("assets", JSON.stringify(action.payload));
      state.assets = action.payload;
    },
    addAsset: (state, action) => {
      // Create a new array with the existing assets and the new asset
      const updatedAssetsArray = [...state.assets, action.payload];
      // Update the state with the new array
      state.assets = updatedAssetsArray;
      // Update sessionStorage with the new array
      sessionStorage.setItem("assets", JSON.stringify(updatedAssetsArray));
    },
    removeAsset: (state, action) => {
      state.assets = state.assets.filter(
        (asset) => asset._id !== action.payload
      );
      sessionStorage.setItem("assets", JSON.stringify(state.assets));
    },
    clearAssets: (state) => {
      sessionStorage.removeItem("assets");
      state.assets = [];
    },
  },
});

export const { addAssetsArray, clearAssets, addAsset, removeAsset } =
  assetSlice.actions;
export default assetSlice.reducer;
