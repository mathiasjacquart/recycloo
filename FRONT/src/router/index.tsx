import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Signin from "../pages/auth/Signin";
import Homepage from "../pages/homepage/Homepage";
import Signup from "../pages/auth/Signup";
import Profile from "../pages/user/Profile";
import UserConnected from "../protectedRoutes/UserConnected";
import UserNotConnected from "../protectedRoutes/UserNotConnected";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Homepage />} />
        <Route
          path="sign-in"
          element={
            <UserNotConnected>
              <Signin></Signin>
            </UserNotConnected>
          }
        />
        <Route
          path="sign-up"
          element={
            <UserNotConnected>
              <Signup></Signup>
            </UserNotConnected>
          }
        />
        <Route
          path="profile"
          element={
            <UserConnected>
              <Profile></Profile>
            </UserConnected>
          }
        />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
          
      </Route>
    </>
  )
);
