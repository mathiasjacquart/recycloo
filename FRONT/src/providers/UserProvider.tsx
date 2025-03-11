import React, { ReactNode, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const parsedUser = userStorage ? JSON.parse(userStorage) : null;

    if (parsedUser) {
      const { token, user } = parsedUser;
      if (token && isTokenValid(token)) {
        setUser(user);
      } else {
        logoutConnectedUser();
      }
    }
  }, []);

  function logoutConnectedUser() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  function setConnectedUser(userConnected: User) {
    if (userConnected) {
      setUser(userConnected);
      localStorage.setItem(
        "user",
        JSON.stringify({ user: userConnected, token: userConnected.token })
      );
    }
  }

  function isTokenValid(token: string): boolean {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.exp * 1000 > new Date().getTime();
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setConnectedUser,
        logoutConnectedUser,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
