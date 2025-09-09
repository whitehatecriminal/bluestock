import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [from, setform] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!from.email || !from.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      console.log("Form submitted:", from);
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(from),
      });

      const data = await response.json();
      console.log("Login data", data);

      if (data.statusCode === 200 || data.success === true) {
        console.log("Login successful:", data);
        // Store the token in localStorage
        localStorage.setItem("token", data.data.token);
        console.log("Token stored in localStorage:", data.data.token);
        alert(`${data.message}`);
        navigate("/dashboard");
      } else {
        alert("Login failed, please check your credentials");
        console.error("Login error:", data.message || "Unknown error");
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="main">
      <div>
        <img src="./Brand Identity.svg" alt="Logo" className="blog" />

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            name="email"
            id="email"
            value={from.email}
            onChange={(e) => setform({ ...from, email: e.target.value })}
          />

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <a
              href="/forgetpassword"
              className="text-sm text-[#6385FF] hover:underline"
            >
              Forget Password?
            </a>
            <div className="passwordinput">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                id="password"
                value={from.password}
                onChange={(e) => setform({ ...from, password: e.target.value })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="eye-toggle"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div
            className="g-recaptcha"
            data-sitekey="6LdDQoErAAAAAJrK8GhYKr6_9Z_0lwPnG9XMf_L_"
          ></div>

          <div className="rember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Keep me signed in</label>
          </div>

          <button className="loginButton" type="submit">
            Login
          </button>
        </form>

        <div className="orsignwith">
          <div className="orsign">or sign in with</div>
        </div>

        <div className="signwithgoogle">
          <img src="./Google.svg" alt="Google Icon" />
          <button>Continue with Google</button>
          <meta
            name="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"
            content="923724275418-4hhq5il6g0fnmiq4q10mr0sjb4f02of1.apps.googleusercontent.com"
          ></meta>
        </div>
        <div className="createNewAccount">
          <a href="/signup">Create an account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
