// Import necessary dependencies
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../constants/helper";
import { toast } from "react-hot-toast";

// VerificationPage component
function VerificationPage() {
  // Get user data from location state
  const location = useLocation();
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  // State variables for verification code and loading state
  const [code, setCode] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${BASE_URL}/verifyEmail`, {
        name: name,
        email: email,
        password: password,
        code: code,
      })
      .then((result) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // Handle different error cases
        if (err.response.status === 400) {
          toast.error("User already exists!");
        } else if (err.response.status === 401) {
          toast.error("Please enter all the details");
        } else {
          toast.error("Internal server error, please try again");
        }
      });
  }

  // Resend verification code
  function resendCode() {
    setLoading(true);
    axios
      .post(`${BASE_URL}/signup`, {
        name: name,
        email: email,
        password: password,
      })
      .then((result) => {
        setLoading(false);
        toast.success("Code resent");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // Handle different error cases
        if (err.response.status === 400) {
          toast.error("User already exists!");
        } else if (err.response.status === 401) {
          toast.error("Please enter all the details");
        } else {
          toast.error("Internal server error, please try again");
        }
      });
  }

  // JSX for verification form
  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage: `url('https://windowscustomization.com/wp-content/uploads/2018/10/cyberpunk-night-city.gif')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      <div className="m-auto p-8 bg-black bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <div className="mb-4">
          <label className="block text-white">Enter Code:</label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </div>
        <button
          className="text-white px-4 py-2 rounded-md mr-2"
          style={{ backgroundColor: "rgb(254,25,254)" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <Link
          to="/signUp"
          className="text-gray-700 bg-gray-300 px-4 py-2 rounded-md mr-2"
          style={{ textDecoration: "none" }}
        >
          Go back
        </Link>
        <button
          className="text-gray-700 bg-gray-300 px-4 py-2 rounded-md"
          onClick={resendCode}
          disabled={loading}
        >
          Resend code
        </button>
      </div>
    </div>
  );
}

export default VerificationPage;
