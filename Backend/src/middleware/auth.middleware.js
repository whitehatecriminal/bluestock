import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { pool } from "../db/db.js";

export const verifyJwt  =asyncHandler(async (req, res, next) => {
const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const result = await pool.query(
  'SELECT id, full_name, email FROM users WHERE id = $1',
  [decodedToken.id]
);

if (result.rows.length === 0) {
  throw new ApiError(401, "User not found");
}

req.user = result.rows[0]; 
  console.log("User authenticated:", req.user);
  next();
});
