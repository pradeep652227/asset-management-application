import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import AssetForm from "../Components/AssetForm";
import { useSelector } from "react-redux";

export default function EditAsset() {
  const { slug } = useParams();
  const asset = useSelector((state) =>
    state.assets.assets.find((asset) => asset.slug === slug)
  );
  const user_details=useSelector(state=>state.auth.user_details);
  const navigateTo=useNavigate();
  if(user_details){
    if(user_details.email !== asset.createdBy){
      alert("Only "+asset.createdBy+"can edit this post");
      navigateTo("/assets");
    }
  }else{
    alert('Sign in First');
    navigateTo("/login");
  }
  return <>
    <AssetForm Asset={asset} />
  </>;
}
