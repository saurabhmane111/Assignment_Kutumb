// src/pages/Login.jsx
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "https://assignment.stage.crafto.app/login",
        {
          username,
          otp,
        }
      );

      // console.log(response);
      // console.log( response.data);
      // console.log( response.status);
      // console.log( response.headers);

      let token = null;

      // Check various possible locations for the token
      if (response.data && response.data.token) {
        token = response.data.token;
      } else if (
        response.data &&
        response.data.data &&
        response.data.data.token
      ) {
        token = response.data.data.token;
      } else if (response.headers && response.headers.authorization) {
        token = response.headers.authorization;
      }

      if (token) {
        console.log("Token found:", token);
        localStorage.setItem("token", token);
        navigate("/quotes");
      } else {
        console.error("Token not found in response");
        setError(
          "Login successful, but token not found in response. Please check the console and contact support."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.log("Error Response:", error.response.data);
        console.log("Error Status:", error.response.status);
        console.log("Error Headers:", error.response.headers);
        setError(
          `Login failed: ${
            error.response.data.message ||
            "Please check your credentials and try again."
          }`
        );
      } else if (error.request) {
        console.log("Error Request:", error.request);
        setError("Network error. Please check your internet connection.");
      } else {
        console.log("Error Message:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", padding: "20px" }}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
