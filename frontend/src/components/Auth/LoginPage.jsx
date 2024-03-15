// Import necessary dependencies
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "../../constants/helper.jsx";
import { toast } from "react-hot-toast";

// LoginPage component
function LoginPage({ authPhase, setAuthPhase }) {
  // State variables for email, password, and form submission status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all the details");
      return;
    }
    setIsSubmitting(true);
    axios
      .post(`${BASE_URL}/login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        // Set JWT token in cookies and axios headers
        const cookie = new Cookies();
        const jwt_token = result.data.jwt_token;
        const decoded = jwtDecode(jwt_token);
        cookie.set("jwt_auth", jwt_token, {
          expires: new Date(decoded.exp * 10000),
        });
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt_token}`;
        // Redirect to home page with user name as state
        navigate("/home", { state: { name: result.data.user.name } });
      })
      .catch((e) => {
        // Handle different error cases
        if (e && e.response) {
          if (e.response.status === 403 || e.response.status === 401) {
            toast.error("Email or password incorrect");
          } else if (e.response.status === 500) {
            toast.error("Unexpected error at server");
          }
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  // JSX for login form
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
      <div className="m-auto p-6 bg-black bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
            onClick={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
        <p className="mt-4">
          Not Registered?{" "}
          <Link to="/signUp" className="text-blue-500">
            Go to signUp page
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
