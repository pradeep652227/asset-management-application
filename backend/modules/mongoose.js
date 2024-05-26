import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbUrl = String(process.env.DBUrl);

/*Schemas*/
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  user_role: { type: String, required: true },
});
const assetSchema = mongoose.Schema({
  name: { type: String, required: true, unique:true },  
  slug:{ type: String, required: true, unique:true },
  quantity:Number,
  createdBy: String,//name or email or id
  user_role:String,
  category: String,
  renewalDate: Date,
  price: String,
},{timestamps:true});

/*Plugins*/

/*Models*/
const User=new mongoose.model("User",userSchema);
const Asset=new mongoose.model("Asset",assetSchema);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

export {User,Asset};
