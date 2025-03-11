import { createContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

interface UserContextType {
  user: User | null;
  setConnectedUser: (userConnected: User) => void;
  logoutConnectedUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Assure-toi de donner un type par défaut pour éviter l'erreur
export const UserContext = createContext<UserContextType | null>(null);
