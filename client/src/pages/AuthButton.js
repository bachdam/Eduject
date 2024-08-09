// AuthButton.js
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/"); // Navigate to home after logout
  };

  const isAuthenticated = localStorage.getItem("token");

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Log out</button> // Show logout button
      ) : (
        <button onClick={() => navigate("/login")}>Log in/Sign up</button> // Show login/signup button
      )}
    </div>
  );
};

export default AuthButton;
