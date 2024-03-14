import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/helper.jsx";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    axios
      .post(`${BASE_URL}/signup`, {
        name: name,
        email: email,
        password: password,
      })
      .then((result) => {
        navigate("/verify", {
          state: {
            password,
            email,
            name,
          },
        });
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
    <div className="flex h-screen bg-slate-400 p-5">
      <div className="m-auto p-6 bg-white rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2">
            Name:
          </label>
          <input
            id="name"
            type="text"
            className="border border-gray-400 p-2 rounded-lg"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="border border-gray-400 p-2 rounded-lg"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-2">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="border border-gray-400 p-2 rounded-lg"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <p className="mt-4">
          Have an account?{" "}
          <Link to="/" className="text-blue-500">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
