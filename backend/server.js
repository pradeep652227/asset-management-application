import express from "express";
import bcrypt from "bcrypt";
import { User, Asset } from "./modules/mongoose.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;

/*Middlewares*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //parsing the incoming JSON data (stringified)

/*POST Routes*/
//Users

app.post("/api/signup-server", (req, res) => {
  let userData =req.body;
  console.log(userData);
  if(!userData.name || !userData.email || !userData.password){
    res
    .status(401)
    .json({ error_msg: "Kindly provide the required field(s)" });

    return ;
  }

  if (
    userData.user_role?.toLowerCase() === "admin" &&
    userData.secret_code !== String(process.env.ADMIN_CODE)
  ) {
    res
      .status(401)
      .json({ error_msg: "Secret Code not correct for Admin Role" });
  } else if (
    userData.user_role?.toLowerCase() === "dev" &&
    userData.secret_code !== String(process.env.DEV_CODE)
  ) {
    res.status(401).json({ error_msg: "Secret Code not correct for Dev Role" });
  } else {
    //General Role- Public
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        console.log("Error in Hashing\n", err);
        res.status(409).json({
          error_code: err.code,
          error_msg: "Error during Hashing",
          error: err,
        });
      }
      userData["password"] = hash;
      User.create(userData)
        .then((user) => {
          console.log("User added with details:-\n", user);
          const sendData = {
            name: user.name,
            email: user.email,
            user_role: user.user_role,
          };
          res.send(sendData);
        })
        .catch((err) => {
          console.log("Error in Adding an User\n", err);
          res.status(400).json({
            error_code: err.code,
            error_msg: "Error in Adding this User",
            error: err,
          });
        });
    });
  }
});

app.post("/api/login-server", (req, res) => {
  const loginData = req.body;
  if(!loginData.email || !loginData.password){
    res
    .status(401)
    .json({ error_msg: "Kindly provide the required field(s)" });

    return ;
  }
  User.findOne({ email: loginData.email })
    .then((user) => {
      if (!user) {
        // If the user does not exist, return an appropriate response
        return res.status(401).json({ error_msg: "User not found" });
      }
      const sendData = {
        name: user.name,
        email: user.email,
        user_role: user.user_role,
      };

      bcrypt
        .compare(loginData.password, user.password) //compare the incoming password (hash it) with the stored password
        .then((result) =>
          result === true ? res.send(sendData) : res.send(false)
        )
        .catch((err) =>
          res.status(500).json({ error_msg: "Error in Database!!" })
        );
    })
    .catch((err) => {
      console.log("Error in Getting User Details\n", err);
      res.status(401).json({
        error_code: err.code,
        error_msg: "Error in Getting User Details",
        error: err,
      });
    });
});

//Assets
app.post("/api/create-asset-server", (req, res) => {
  const assetData = req.body;
  //create a collection
  let rand = Math.floor(Math.random() * 10000);
  let slug = assetData.name + "-asset-" + rand;
  assetData["slug"] = slug.toLocaleLowerCase();
  Asset.create(assetData)
    .then((asset) => {
      //created the asset
      res.send(asset);
    })
    .catch((err) => {
      console.log("Error in Creating an Asset", err);
      res.status(409).json({
        error_code: err.code,
        error_msg:
          "Item Already Exists. You can increase its quantity or update it",
        error: err,
      });
    });
});

/*Update Routes*/
app.patch("/api/update-asset", (req, res) => {
  const assetData = req.body;
  const assetCreatedBy = assetData.createdBy;
  Asset.updateOne({ email: assetCreatedBy }, { $set: assetData })
    .then((result) => {
      console.log("Result after updating the asset\n", result);
      res.send(true);
    })
    .catch((err) => {
      console.log("Error in updating an Asset\n", err);
      res.status(409).json({
        error_code: err.code,
        error_msg: "Error in Updating this asset",
        error: err,
      });
    });
});

/*Delete Routes*/
app.delete("/api/delete-asset/:assetId", (req, res) => {
  const assetId = req.params.assetId;

  Asset.deleteOne({ _id: assetId })
    .then((result) => {
      console.log("Deleted the asset with result\n", result);
      res.send(true);
    })
    .catch((err) => {
      console.log("Error in Deleting an Asset\n", err);
      res.status(409).json({
        error_code: err.code,
        error_msg: "Error in Deleting this asset",
        error: err,
      });
    });
});

/*GET Routes*/
app.get("/api/assets-data", (req, res) => {
  Asset.find({})
    .then((assets) => {
      res.send(assets);
    })
    .catch((err) => {
      res.status(400).json({
        error_code: err.code,
        error_msg: "Error in Fetching the Assets Collection",
        error: err,
      });
    });
});

app.get("/",(req,res)=>{
  res.send('Hi');
})
//server start
app.listen(PORT, () => {
  console.log(`Server is Started at PORT= ${PORT}`);
});

export default app;