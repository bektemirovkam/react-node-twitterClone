import express from "express";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();


import "./core/db";
import { userCtrl } from "./controllers/userControllers";
import { registerValidations } from "./validations/register";
import { passport } from "./core/passport";
import { tweetCtrl } from "./controllers/tweetControllers";
import { addTweetValidations } from "./validations/addTweet";
import { uploadCtrl } from "./controllers/uploadControllers";

const app = express();

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize())



app.get("/users", userCtrl.index);
app.get("/users/me", passport.authenticate("jwt"), userCtrl.getUserInfo);
app.get("/users/:id", userCtrl.show);

app.get("/auth/verify", userCtrl.verify);
app.post("/auth/register", registerValidations, userCtrl.create);
app.post("/auth/login", passport.authenticate("local"), userCtrl.afterLogin);

app.get("/tweets", tweetCtrl.index);
app.get("/tweets/:id", tweetCtrl.show);
app.delete("/tweets/:id", passport.authenticate("jwt"), tweetCtrl.delete);
app.post("/tweets",passport.authenticate("jwt") , addTweetValidations,tweetCtrl.create)
app.patch("/tweets/:id", passport.authenticate("jwt"), addTweetValidations, tweetCtrl.update);

app.post("/upload", upload.single('image'), uploadCtrl.upload);


const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server is run on port ${PORT}`);
});


// export {passport}