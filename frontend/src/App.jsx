import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import SignUpPage from "./components/Auth/SignupPage";
import VerificationPage from "./components/Auth/VerificationPage";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
