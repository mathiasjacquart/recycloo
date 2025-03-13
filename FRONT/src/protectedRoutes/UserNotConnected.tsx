import React, { ReactNode, useContext } from "react";

import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface UserProviderProps {
  children: ReactNode;
}

export default function UserNotConnected({ children }: UserProviderProps) {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const { user } = userContext;

  return !user ? children : <Navigate to="/" />;
}
