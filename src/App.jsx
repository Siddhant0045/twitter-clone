import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignUpPage from "./components/signuppage/signuppage";
import SignInPage from "./components/SignInPage/SignInPage"; // your login page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} /> {/* Default route */}
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
