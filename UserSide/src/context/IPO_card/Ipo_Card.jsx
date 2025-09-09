import React, { useEffect, useState } from "react";
import "./card.css";

function Ipo_Card() {
  const [card, setCard] = useState([]);

  useEffect(() => {
    const carddetail = [
      {
        id: 1,
        company: "Repono",
        img: "https://repono.in/assets/images/logo/logo-white.png",
        priceBand: "91-95",
        open: "28-07-25",
        close: "30-07-25",
        issueSize: "26.40 Cr",
        issueType: "Book Built",
        listingDate: "04-08-2025",
      },
      {
        id: 2,
        company: "Repono",
        img: "./Buy.svg",
        priceBand: "91-95",
        open: "28-07-25",
        close: "30-07-25",
        issueSize: "26.40 Cr",
        issueType: "Book Built",
        listingDate: "04-08-2025",
      },
      {
        id: 3,
        company: "Repono",
        img: "./Buy.svg",
        priceBand: "91-95",
        open: "28-07-25",
        close: "30-07-25",
        issueSize: "26.40 Cr",
        issueType: "Book Built",
        listingDate: "04-08-2025",
      },
      {
        id: 4,
        company: "Repono",
        img: "./Buy.svg",
        priceBand: "91-95",
        open: "28-07-25",
        close: "30-07-25",
        issueSize: "26.40 Cr",
        issueType: "Book Built",
        listingDate: "04-08-2025",
      },
    ];
    setCard(carddetail);
  }, []);
  return (
    <div className="universal">
      <div className="outercard">
        {card.map((detail) => (
        <div className="card" key={detail.id}>
          <div className="cardHeader">
            <img src={detail.img} alt="" />
            <h1>{detail.company}</h1>
          </div>
          <div className="ipodetails">
            <span>PRICE BAND</span>
            <span>OPEN</span>
            <span>CLOSE</span>
          </div>
          <div className="ipodetail">
            <span>{detail.priceBand}</span>
            <span>{detail.open} </span>
            <span>{detail.close}</span>
          </div>

          <div className="ipodetails">
            <span>ISSUE SIZE</span>
            <span>ISSUE TYPE</span>
            <span>LISTING DATE</span>
          </div>

          <div className="ipodetail">
            <span>{detail.issueSize}</span>
            <span>{detail.issueType}</span>
            <span>{detail.listingDate}</span>
          </div>
          <div className="RHPButton">
            <button className="RHP">RHP</button>
            <button className="DRHP">DRHP</button>
          </div>
        </div>
      ))}
      </div>

      <div className="F&O">
        <h1>Frequently Asked Questions?</h1>
        <p>Find answers to common questions that come in your mind related to IPO.</p>
      </div>
    </div>
  );
}

export default Ipo_Card;
