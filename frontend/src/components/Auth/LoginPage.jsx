import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "../../constants/helper.jsx";

function LoginPage({ authPhase, setAuthPhase }) {
  let [passType, setPassType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        const cookie = new Cookies();
        console.log(result);
        const jwt_token = result.data.jwt_token;
        const decoded = jwtDecode(jwt_token);
        setUser(decoded);
        cookie.set("jwt_auth", jwt_token, {
          expires: new Date(decoded.exp * 10000),
        });
        console.log(result.data.user.name);
        navigate("/home", { state: { name: result.data.user.name } });
      })
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 403) {
            alert("Email or password incorrect");
          } else if (e.response.status === 400) {
            alert("Please fill all the details");
          } else if (e.response.status === 401) {
            alert("Email or password incorrect");
          } else if (e.response.status === 500) {
            alert("Unexpected error at server");
          }
        }
      });
  }

  return (
    <div className="flex h-screen bg-slate-400">
      <div className="m-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
            onClick={handleLogin}
          >
            Submit
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
