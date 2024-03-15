import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../constants/helper";

function VerificationPage() {
  const location = useLocation();
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const [code, setCode] = useState(0);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/verifyEmail`, {
        name: name,
        email: email,
        password: password,
        code: code,
      })
      .then((result) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          alert("User already exists!");
        } else if (err.response.status === 401) {
          alert("Please enter all the details");
        } else {
          alert("Internal server error, please try again");
        }
      });
  }

  function resendCode() {
    axios
      .post(`${BASE_URL}/signup`, {
        name: name,
        email: email,
        password: password,
      })
      .then((result) => {
        alert("Code resent");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          alert("User already exists!");
        } else if (err.response.status === 401) {
          alert("Please enter all the details");
        } else {
          alert("Internal server error, please try again");
        }
      });
  }

  return (
    <div className="flex h-screen bg-slate-400 justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <div className="mb-4">
          <label className="block">Enter Code:</label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
          onClick={() => {
            navigate("/signUp");
          }}
        >
          Go back
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          onClick={resendCode}
        >
          Resend code
        </button>
      </div>
    </div>
  );
}

export default VerificationPage;
