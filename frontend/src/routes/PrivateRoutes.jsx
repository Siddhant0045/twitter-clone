// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const loadingStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#000', // full black background
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const spinnerStyle = {
  width: '60px',
  height: '60px',
  border: '6px solid rgba(74, 144, 226, 0.3)', // lighter blue circle border
  borderTop: '6px solid #4A90E2',               // bright blue top border
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  console.log("PrivateRoute - current user:", user);

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;
