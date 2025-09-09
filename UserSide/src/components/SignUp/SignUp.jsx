import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted:", form);
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/register",
        " http://10.245.222.209:3000/api/v1/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("sinup data", data);
        if (data.statusCode === 200 || data.success === true) {
          console.log("Signup successful:", data);
          alert(`${data.message}`);
          navigate("/login");
        } else {
          console.log("Signup failed:", data);
          alert(`${data.message}`);
        }
      }else {
        const text = await response.text();
        throw new Error("Response is not in JSON format: "+ text);
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="SignUppdiv">
      <div className="Headerside">
        <img src="./Brand Identity.svg" alt="Logo" />
        <h2>Create an account</h2>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="fullname">Name</label>
        <input
          type="text"
          id="fullname"
          placeholder="Enter Your Name"
          value={form.fullname}
          onChange={(e) => setform({ ...form, fullname: e.target.value })}
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="hello@bluestock.in"
          value={form.email}
          onChange={(e) => setform({ ...form, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            id="password"
            className="input-with-eye"
            value={form.password}
            onChange={(e) => setform({ ...form, password: e.target.value })}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="eye-toggle"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <span className="terms">
          By continuing, you agree to our{" "}
          <span style={{ color: "#2F4EFF" }}>terms of service.</span>
        </span>

        <div
          className="g-recaptcha"
          data-sitekey="6LdDQoErAAAAAJrK8GhYKr6_9Z_0lwPnG9XMf_L_"
        ></div>

        <button type="submit">Sign up</button>
      </form>

      <div className="or">
        <div className="orsign">or sign in with</div>
      </div>

      <div className="signwithgoogle">
        <img src="./Google.svg" alt="Google Icon" />
        <button>Continue with Google</button>
      </div>

      <span className="Already">
        Already have an account?{" "}
        <a href="./login" className="text-[#3F52FF] font-600">
          Sign in here
        </a>
      </span>
    </div>
  );
}

export default SignUp;
