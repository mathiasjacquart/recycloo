import React, { useContext, ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface UserConnectedProps {
  children: ReactNode;
}

export default function UserConnected({ children }: UserConnectedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    // Vérifier si le contexte est chargé
    if (userContext !== null) {
      // Attendre un court instant pour s'assurer que le contexte est complètement initialisé
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [userContext]);

  if (isLoading) {
    // Afficher un indicateur de chargement ou rien pendant l'initialisation
    return <div>Chargement...</div>;
  }

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user } = userContext;
  console.log("User in UserConnected:", user);

  // Rediriger uniquement après avoir confirmé qu'il n'y a pas d'utilisateur
  return user ? children : <Navigate to="/sign-in" />;
}
