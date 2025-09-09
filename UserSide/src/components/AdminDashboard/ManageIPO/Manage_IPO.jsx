import React, { useEffect, useState } from "react";
import "./Manage_IPO.css";
import { Outlet, useNavigate } from "react-router-dom";

function Manage_IPO() {
  const [ipoList, setIpoList] = useState([]);
  const navigate  =useNavigate();

  useEffect(() => {
    const sample = [
      {
        id: 1,
        company: "Repono",
        priceBand: "91-95",
        open: "28-07-25",
        close: "30-07-25",
        issueSize: "26.40 Cr",
        issueType: "Book Built",
        listingDate: "04-08-2025",
        status: "Ongoing",
      },
      {
        id: 2,
        company: "Repono",
        priceBand: "91-95",
        open: "28-07-25",
        close: "30-07-25",
        issueSize: "26.40 Cr",
        issueType: "Book Built",
        listingDate: "04-08-2025",
        status: "comming",
      },
      {
        id: 3,
        company: "Repono",
        priceBand: "91-95",
        open: "28-07-25",
        close: "30-07-25",
        issueSize: "26.40 Cr",
        issueType: "Book Built",
        listingDate: "04-08-2025",
        status: "newlisted",
      },
    ];
    setIpoList(sample);
  }, []);
  return (
    <div className="Manage">
      <div className="upcoming">
        <h1>Upcoming IPO | Dashboard</h1>
        <button onClick={()=> navigate("registeripo")}>Register IPO</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Price Band</th>
            <th>Open</th>
            <th>Close</th>
            <th>ISSUE SIZE</th>
            <th>ISSUE Type</th>
            <th>Listing Date</th>
            <th>Status</th>
            <th>Action</th>
            <th>Delete/View</th>
          </tr>
        </thead>
        <tbody>
          {ipoList.map((ipo, index) => (
            <tr key={ipo.id} className={index % 2 === 0 ? "even" : "odd"}>
              <td>{ipo.company}</td>
              <td>{ipo.priceBand}</td>
              <td>{ipo.open}</td>
              <td>{ipo.close}</td>
              <td>{ipo.issueSize}</td>
              <td>{ipo.issueType}</td>
              <td>{ipo.listingDate}</td>
              <td>
                <span
                  className={`status ${ipo.status
                    .toLowerCase()
                    .replace(/\s/g, '')}`}
                >
                  {ipo.status}
                </span>
              </td>
              <td>
                <button className="update">Update</button>
              </td>
              <td className="deleteview">
                <button>
                  <img src="../trash.svg" alt="trash" />
                </button>
                <button>
                  <img src="../eye.svg" alt="view" className="eye"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{flexGrow: 1, padding: "20px"}}>
        <Outlet />
      </div>
    </div>
  );
}

export default Manage_IPO;
