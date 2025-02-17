import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import Signin from "../pages/auth/Signin";
import Homepage from "../pages/homepage/Homepage";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App></App>}>
            <Route index element={<Homepage/>}/>
            <Route
            path="sign-in"
            element={<Signin/>}

            />
        </Route>
    )   
)

