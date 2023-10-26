import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/Toaster";

import { HomePage } from "./pages/home";
import { SignInPage } from "./pages/signin";
import { SignUpPage } from "./pages/signup";
import { AddCatPage } from "./pages/add-cat";
import { EditCatPage } from "./pages/edit-cat";
import { ProfilePage } from "./pages/profile";

import { ToasterProvider } from "./components/toaster/toaster-context";
import { AuthenticationProvider } from "./contexts/authentication-provider";
import { AuthGuard } from "./components/auth-guard";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <>
        <HomePage />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/cats/new",

        element: (
          <AuthGuard>
            <AddCatPage />
          </AuthGuard>
        ),
      },
      {
        path: "/cats/:id/edit",
        element: (
          <AuthGuard>
            <EditCatPage />
          </AuthGuard>
        ),
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <ToasterProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ToasterProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
);
