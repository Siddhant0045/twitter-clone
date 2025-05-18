import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignUpPage from "./pages/signuppage/signuppage";
import SignInPage from "./pages/SignInPage/SignInPage"; // your login page component
import HomePage from "./pages/MainTwitterPages/HomePage/HomePage"; // your home page component
import ProfilePage from "./pages/MainTwitterPages/ProfilePage/ProfilePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} /> {/* Default route */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
