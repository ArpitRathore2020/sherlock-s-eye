// Import necessary dependencies
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/helper.jsx";
import { toast } from "react-hot-toast";

// SignUpPage component
function SignUpPage() {
  // State variables for email, name, and password
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    toast.loading("Submitting..."); // Show loading toast
    axios
      .post(`${BASE_URL}/signup`, {
        name: name,
        email: email,
        password: password,
      })
      .then((result) => {
        // Redirect to verification page with user data as state
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
        // Handle different error cases
        if (err.response.status === 400) {
          toast.error("User already exists!");
        } else if (err.response.status === 401) {
          toast.error("Please enter all the details");
        } else {
          toast.error("Internal server error, please try again");
        }
      })
      .finally(() => {
        toast.dismiss(); // Dismiss loading toast
      });
  }

  // JSX for sign up form
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
      <div className="m-auto p-6 bg-black bg-opacity-80 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2 text-white">
            Name:
          </label>
          <input
            id="name"
            type="text"
            className="border border-gray-400 p-2 rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2 text-white">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="border border-gray-400 p-2 rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-2 text-white">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="border border-gray-400 p-2 rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="text-white px-4 py-2 rounded-lg"
            style={{ backgroundColor: "rgb(254,25,254)" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <p className="mt-4">
          Have an account?{" "}
          <Link
            to="/"
            className="text-pink-400 hover:text-pink-600"
            style={{ textDecoration: "none" }}
          >
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
