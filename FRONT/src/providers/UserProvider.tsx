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
    // Récupérer les données du localStorage
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      try {
        // Analyser les données stockées
        const parsedStorage = JSON.parse(userStorage);

        // Vérifier si nous avons un objet avec user et token
        if (parsedStorage && parsedStorage.user && parsedStorage.token) {
          // Vérifier si le token est valide
          if (isTokenValid(parsedStorage.token)) {
            // Définir l'utilisateur avec son token
            const userWithToken = {
              ...parsedStorage.user,
              token: parsedStorage.token,
            };
            setUser(userWithToken);
          } else {
            logoutConnectedUser();
          }
        } else {
          console.warn(
            "Format de données utilisateur invalide dans localStorage"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse des données utilisateur:",
          error
        );
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
      // S'assurer que l'utilisateur a un token
      if (!userConnected.token) {
        console.warn("Tentative de définir un utilisateur sans token");
        return;
      }

      // Mettre à jour l'état
      setUser(userConnected);
      console.log(user);

      // Enregistrer dans localStorage
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
      console.error("Erreur lors de la validation du token:", error);
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
