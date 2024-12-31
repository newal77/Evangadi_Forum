
import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children,msg,redirect }) => {
  const token = localStorage.getItem("token");


  if (!token) {
    return <Navigate to="/login" state={{ msg, redirect }} />;
  }

  return children;
};

export default ProtectedRoute;
