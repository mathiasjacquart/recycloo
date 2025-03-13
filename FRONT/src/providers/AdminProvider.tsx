import React, { ReactNode, useEffect, useState } from "react";
import { AdminContext } from "../context/Admincontext";
import { useNavigate } from "react-router-dom";

interface Admin {
  id: string;
  email: string;
  token?: string;
}

interface AdminProviderProps {
  children: ReactNode;
}

function AdminProvider({ children }: AdminProviderProps) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les données du localStorage
    const adminStorage = localStorage.getItem("admin");

    if (adminStorage) {
      try {
        // Analyser les données stockées
        const parsedStorage = JSON.parse(adminStorage);

        // Vérifier si nous avons un objet avec admin et token
        if (parsedStorage && parsedStorage.admin && parsedStorage.token) {
          // Vérifier si le token est valide
          if (isTokenValid(parsedStorage.token)) {
            // Définir l'utilisateur avec son token
            const adminWithToken = {
              ...parsedStorage.admin,
              token: parsedStorage.token,
            };
            setAdmin(adminWithToken);
            console.log(admin);
          } else {
            logoutConnectedAdmin();
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
        logoutConnectedAdmin();
      }
    }
  }, []);
  function logoutConnectedAdmin() {
    localStorage.removeItem("admin");
    setAdmin(null);
    navigate("/");
  }
  function setConnectedAdmin(adminConnected: Admin) {
    if (adminConnected) {
      // S'assurer que l'utilisateur a un token
      if (!adminConnected.token) {
        console.warn("Tentative de définir un utilisateur sans token");
        return;
      }

      const adminData = {
        admin: adminConnected,
        token: adminConnected.token,
      };

      // Enregistrer dans localStorage d'abord
      localStorage.setItem("admin", JSON.stringify(adminData));

      // Puis mettre à jour l'état
      setAdmin(adminConnected);
      console.log(admin);
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
    <AdminContext.Provider
      value={{
        admin,
        setConnectedAdmin,
        logoutConnectedAdmin,
        setAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
