import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./components/pages/register.tsx";
import UserPage from "./components/pages/user.tsx";
import HomePage from "./components/pages/home.tsx";
import LoginPage from "./components/pages/login.tsx";
import { AuthWrapper } from "./components/contexts/auth.context.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

const rootEl = document.getElementById("root");

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <AuthWrapper>
        <RouterProvider router={router} />
      </AuthWrapper>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
