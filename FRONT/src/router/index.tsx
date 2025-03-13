import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Signin from "../pages/auth/Signin";
import Homepage from "../pages/homepage/Homepage";
import Signup from "../pages/auth/Signup";
import Profile from "../pages/user/Profile";
import UserConnected from "../protectedRoutes/UserConnected";
import UserNotConnected from "../protectedRoutes/UserNotConnected";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
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
          <UserConnected>
            <Signup></Signup>
          </UserConnected>
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
  )
);
