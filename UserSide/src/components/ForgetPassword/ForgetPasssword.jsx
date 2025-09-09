import React from "react";
import "./Forgetpassword.css";

function ForgetPasssword() {
  return (
    <div className="Forgetpasswordform">
      <div>
        <img src="./Brand Identity.svg" alt="" className="w-[216px] h-36" />
        <div className="forgettext">
          <h2>Forgot Password?</h2>
          <p>Enter your email address to get the </p>
          <span>password reset link.</span>
        </div>

        <form action="" className="forgetpassword">
          <label htmlFor="Email">Email Address</label> <br />
          <input
            type="email"
            name=""
            id="forgetmail"
            placeholder="hello@bluestock.in"
          />
          <button>Password Reset</button>
        </form>
        <a href="/login">Back to login</a>
      </div>
    </div>
  );
}

export default ForgetPasssword;
