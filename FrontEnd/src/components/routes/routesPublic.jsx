// routes/routesPublic.js

import React from "react";
import { Navigate } from "react-router-dom";
import { MainPage } from "../../pages/MainPage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { AccountPage } from "../../pages/AccountPage";
import { ProtectedRouter } from "./ProtectedRouter";
import { useAuthStore } from "../../store/useAuthStore";


export const RoutesPublic = [
    { path:'/',element:<MainPage/>},
    { path:'/login',element:<LoginPage/>},
    { path:'/register',element:<RegisterPage/>}
]
