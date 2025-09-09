import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";

import {
  registerUser,
  loginUser,
  changeCurrentPassword,
  currentUser,
} from "../controllers/user.controller.js";
import { ApiError } from "../utils/ApiError.js";
import { Ipo } from "../controllers/ipos.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { registercompaie } from "../controllers/companies.controller.js";
import { IpoApi } from "../controllers/ipoApi.controller.js";

const router = Router();

router
  .route("/register", (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("User registration data:", req.body);
    res.status(200).json({ message: "Registration successful" });
  })
  .post(registerUser);
router
  .route("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    console.log("User login data:", req.body);
    res.status(200).json({ message: "Login successful" });
  })
  .post(loginUser);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/currentuser").get(verifyJwt, currentUser)
router.route("/ipo").post(verifyJwt, Ipo)
router.route("/registercompanie").post(
  upload.single("logo"),
  verifyJwt,
  registercompaie
);
router.route("/ipoApi", (req, res)=> {
  res.send("Hello from ipo")
}).get(IpoApi);

export default router;
