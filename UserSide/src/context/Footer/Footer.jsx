import React from "react";
import './Footer.css'

function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t py-10 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 flex gap-[100px] ">
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Trading View
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                NSE Holiday
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                e-Voting CDSL
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                e-Voting NSDL
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Market Timings
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Community
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Offerings</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Compare Broker
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Fin Calculators
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                IPO
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                All Brokers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Products
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Links</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Smart Investor
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Mutual Funds
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Sitemap
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Indian Indices
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Bug Bounty Program
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Policy</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Disclaimer
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trust & Security
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="partner">
        <div className="m-[90px]">
          <div className="flex items-center space-x-4">
            <a href="#">
              <i className="fab fa-facebook text-lg"></i>
            </a>
            <a href="#">
              <i className="fab fa-x-twitter text-[#0078FF] "></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin text-lg"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram text-lg"></i>
            </a>
          </div>
          <div className="mt-[90px] flex flex-col items-center">
            <img
              src="/Brand Identity.svg"
              alt="Bluestock Logo"
              className="h-10"
            />
            <span>
              Bluestock Fintech Pvt Ltd
              <br />
              Pune, Maharashtra
            </span>

            <p className="mt-[12px]">MSME Registration No: <br />
                UDYAM-MH-01-v0138001 
            </p>
            <img src="./startup india.svg" alt="" />
          </div>
        </div>

        
        <div className="mt-[50px] leading-loose">
          <p>
            Investment in securities markets are subject to market risks, read
            all the related documents carefully before investing as <br />
            prescribed by SEBI. Issued in the interest of the investors.
          </p>
          <p>
            The users can write to <a href="mailto:sales-complaints@fyers.in?subject=Support Request&body=Hello, I need help with..." className="text-blue-600">hello@bluestock.in</a> for any app, website
            related queries. Also you can send IT / Tech related feedback to{" "}
            <a href="mailto:tech-feedback@fyers.in?subject=Feedback Request&body=I am Happy" className="text-blue-600">cto@bluestock.in</a>
          </p>
          <p>
            Disclaimer: We are not a SEBI registered research analyst company.
            We do not provide any kind of stock recommendations, buy/ <br />
            sell stock tips, or investment and trading advice. All the stock
            scripts shown in the Bluestock app, website, all social media
            handles <br />
            are for educational purposes only. <br /> <br />
            Before making any investment in the financial market, it is
            advisable to consult with your financial advisor. Remember that
            stock <br />
            markets are subject to market risks.
          </p>
        </div>
      </div>
      <hr className="border border-[#667384]" />
      <p className="text-[#667384] ">Bluestock Fintech All Rights Reserved.</p>
      <p className="text-right mr-[12px]">Made with ❤️ in Pune, Maharashtra</p>
    </footer>
  );
}

export default Footer;
