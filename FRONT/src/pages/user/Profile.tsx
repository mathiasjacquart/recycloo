import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
function Profile() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const { user } = userContext;
  console.log(user);

  return <div>Profile</div>;
}

export default Profile;
