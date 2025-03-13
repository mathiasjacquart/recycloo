import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

export default function Logout() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const { logoutConnectedUser } = userContext;
  useEffect(() => {
    logoutConnectedUser();
  }, []);

  return (
    <div>
      <h2>Déconnexion en cours ...</h2>
    </div>
  );
}
