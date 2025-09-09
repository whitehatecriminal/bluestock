import { pool } from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const IpoApi = asyncHandler(async (req, res)=>{

    const data = await pool.query("SELECT * FROM ipos");
    if (data.rows.length === 0) {
        throw new ApiError(404, "No IPOs found");
    }

    return res.status(200).json({data: data.rows})
})

export { IpoApi };