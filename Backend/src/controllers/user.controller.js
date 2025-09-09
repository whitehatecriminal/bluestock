import { asyncHandler } from "../utils/asyncHandler.js";
import { pool } from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessAndRefreshTokens = (user) => {

  if (!user || !user.id) {
    throw new ApiError(500, "Invalid user object for token generation");
  }
  try {
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET || "Stock",
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET || "Stock-Market",
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "24h" }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if ([fullname, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (existedUser.rows.length > 0) {
    // throw new ApiError(409, "User already exists");
    return res.status(409).json(new ApiResponse(409, null, "User already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  //adding refresh token in db
  // const RFT = generateAccessAndRefreshTokens()
  // console.log("Referesh token generated", generateAccessAndRefreshTokens());

  const userResult = await pool.query(
    "INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, full_name, email",
    [fullname, email, hashedPassword]
  );

  const user = userResult.rows[0];

  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);
  await pool.query("UPDATE users SET refresh_Token = $1 WHERE id = $2", [
  refreshToken,
  user.id,
]);


  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User registered successfully", user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (result.rows.length === 0) {
    throw new ApiError(401, "Invalid email or password");
  }

  const user = result.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);
  await pool.query("UPDATE users SET refresh_Token = $1 WHERE id = $2", [
  refreshToken,
  user.id,
]);


  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  const safeUser = {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    token: accessToken, // Include the access token in the response
  };

  return res.status(200).json(new ApiResponse(200, safeUser, "User logged in successfully"));
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.refreshToken ||
    req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const userResult = await pool.query(
    "SELECT id, full_name, email FROM users WHERE id = $1",
    [decoded.id]
  );

  if (userResult.rows.length === 0) {
    throw new ApiError(401, "User not found");
  }

  req.user = userResult.rows[0];
  next();
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if ([currentPassword, newPassword].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  

  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

  const user = userResult.rows[0];
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);

  if (!isPasswordValid) {
    throw new ApiError(401, "Current password is incorrect");
  }

  if (currentPassword === newPassword) {
    throw new ApiError(400, "New password cannot be the same as current password");
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await pool.query(
    "UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING id, full_name, email",
    [newHashedPassword, userId]
  );

  res.cookie("accessToken", accessToken, {
  httpOnly: true,
  secure: false, // change to true in production with HTTPS
  maxAge: 60 * 60 * 1000, // 1 hour
});


  return res
    .status(200)
    .json(new ApiResponse("Password changed successfully", updatedUser.rows[0]));
});

const currentUser = asyncHandler(async (req, res)=>{
  //getting current user
  if (!req.user) {
    return res.status(401).json(new ApiResponse(401, null, "Unauthoried User"))
  }
  console.log("current user", req.user)
  return res.status(200).json(new ApiResponse(200, req.user, "current user get successfully"));
})

export { registerUser, loginUser, changeCurrentPassword, 
  refreshToken, currentUser };
