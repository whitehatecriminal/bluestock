import { pool } from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const Ipo = asyncHandler(async (req, res) => {
  const { companyName, PriceBand, open, close, issueSize, ListingDate, totalShare } = req.body;

  // Validate fields are present and non-empty
  if (
    ![companyName, PriceBand, open, close, issueSize, ListingDate, totalShare].every(
      (field) => typeof field === "string" && field.trim() !== ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Validate totalShare number
  const totalShareNum = Number(totalShare);
  if (isNaN(totalShareNum)) {
    throw new ApiError(400, "Invalid totalShare; must be a number");
  }

  // Check that company exists & get ID
  const companyCheck = await pool.query("SELECT id FROM companies WHERE name = $1", [companyName]);
  if (companyCheck.rows.length === 0) {
    throw new ApiError(404, "Company not found");
  }

  const companyId = companyCheck.rows[0].id;
  console.log("Company ID:", companyId);

  function parseIPO(data) {
    const [minPrice, maxPrice] = data.PriceBand.split("-").map(Number);
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      throw new ApiError(400, "Invalid PriceBand format; should be 'number-number'");
    }

    function parseDate(str) {
      let [day, month, year] = str.split("-");
      if (!year || year.length < 2) throw new ApiError(400, "Invalid date format: " + str);
      if (year.length === 2) year = (parseInt(year, 10) < 50 ? "20" : "19") + year;
      let iso = `${year}-${month}-${day}`;
      let d = new Date(iso);
      if (isNaN(d.getTime())) throw new ApiError(400, "Invalid date: " + str);
      return d;
    }

    const openDate = parseDate(data.open);
    const closeDate = parseDate(data.close);
    const listingDate = parseDate(data.ListingDate);

    const issueSz = Number(data.issueSize);
    if (isNaN(issueSz)) throw new ApiError(400, "Invalid issueSize");

    return {
      companyName: data.companyName,
      priceBand: { min: minPrice, max: maxPrice },
      open: openDate,
      close: closeDate,
      issueSize: issueSz,
      listingDate: listingDate,
    };
  }

  const parsedIpo = parseIPO(req.body);

  const Iposdata = await pool.query(
    `INSERT INTO ipos 
    (company_id, price_band_low, price_band_high, open_date, close_date, lot_size, total_shares, status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      companyId,
      parsedIpo.priceBand.min,
      parsedIpo.priceBand.max,
      parsedIpo.open,
      parsedIpo.close,
      parsedIpo.issueSize,
      totalShareNum,
      "upcoming",
    ]
  );

  return res.status(200).json(new ApiResponse(200, Iposdata.rows[0], "IPO data inserted successfully"));
});


export { Ipo };
