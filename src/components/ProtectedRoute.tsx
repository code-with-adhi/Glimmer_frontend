import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, isAuthLoading } = useAuth();

  // 1. While the app is checking for a token, show a loading message.
  if (isAuthLoading) {
    return <div className="p-8">Loading...</div>;
  }

  // 2. After checking, if there is no token, redirect to the login page.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. If there is a token, show the protected page.
  return <>{children}</>;
}

export default ProtectedRoute;
