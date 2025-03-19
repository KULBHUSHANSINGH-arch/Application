import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../Styles/Login.css"; // Import CSS file
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const STATIC_EMAIL = ".com";
  const STATIC_PASSWORD = ".com";

  const handleLogin = () => {
    if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
      localStorage.setItem("user", JSON.stringify({ email })); 
      navigate("/sidebar"); 
      console.log('User Logged In Successfully');

    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Log In</h2>

        {/* Email Input */}
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Forgot Password */}
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        {/* Login Button */}
        <button className="login-button" onClick={handleLogin}>Log In</button>

        {/* Sign Up Link */}
        <div className="signup-text">
          Don't have an account? <a href="/registration">Registration</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
