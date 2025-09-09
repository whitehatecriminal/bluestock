import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { pool } from "../db/db.js";

const registercompaie = asyncHandler(async (req, res)=> {
    const {companieName, sector, description} = req.body

    if(![companieName, sector, description].every(
        (field) => typeof field === "string" && field.trim() !== ""
    )) {
        throw new ApiError(400, "All fields are required");
    }

    const exitedcompany = await pool.query("SELECT * FROM companies WHERE name = $1", [companieName]);
    if(exitedcompany.rows.length > 0) {
        throw new ApiError(400, "Company already exists");
    }

    const register = await pool.query("INSERT INTO companies (name, sector, description) VALUES ($1, $2, $3) RETURNING *", [
        companieName, sector, description
    ]);

    const company = register.rows[0]

    const logo = req.file
    //uploading logo to the database
    if(!logo) {
        throw new ApiError(400, "Logo is required");
    }
    const logopath = await pool.query("UPDATE COMPANIES SET logo_url = $1 WHERE id = $2", [
        logo.path, company.id
    ]);
    
    return res
    .status(200)
    .json(new ApiResponse(200, company, logopath, "compay registered successfully"))
})

export{registercompaie}