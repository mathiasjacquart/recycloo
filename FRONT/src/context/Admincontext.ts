import { createContext } from "react";

interface Admin {
  id: string;
  name: string;
  email: string;
  token?: string;
}

interface AdminContextType {
  admin: Admin | null;
  setConnectedAdmin: (adminConnected: Admin) => void;
  logoutConnectedAdmin: () => void;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
}

// Assure-toi de donner un type par défaut pour éviter l'erreur
export const AdminContext = createContext<AdminContextType | null>(null);
