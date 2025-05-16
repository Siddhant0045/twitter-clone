import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignUpPage from "./pages/signuppage/signuppage";
import SignInPage from "./pages/SignInPage/SignInPage"; // your login page component
import HomePage from "./pages/HomePage/HomePage"; // your home page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default route */}
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
        <Route path="/login" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
