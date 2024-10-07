import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/toaster";

import { HomePage } from "./pages/home";
import { SignInPage } from "./pages/signin";
import { SignUpPage } from "./pages/signup";
import { SignoutPage } from "./pages/signout";
import { AddCatPage } from "./pages/add-cat";
import { EditCatPage } from "./pages/edit-cat";
import { ProfilePage } from "./pages/profile";

import { ToasterProvider } from "./components/toaster/provider";
import { AuthenticationProvider } from "./contexts/authentication-provider";
import { CatsProvider } from "./contexts/cats-provider";
import { SessionGuard } from "./containers/session-guard";
import { CatOwnerEditGuard } from "./containers/cat-owner-edit-guard";

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
          <SessionGuard>
            <AddCatPage />
          </SessionGuard>
        ),
      },
      {
        path: "/cats/:id/edit",
        element: (
          <SessionGuard>
            <CatOwnerEditGuard>
              <EditCatPage />
            </CatOwnerEditGuard>
          </SessionGuard>
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
        path: "/signout",
        element: <SignoutPage />,
      },
      {
        path: "/profile",
        element: (
          <SessionGuard>
            <ProfilePage />
          </SessionGuard>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthenticationProvider>
    <CatsProvider>
      <ToasterProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ToasterProvider>
    </CatsProvider>
  </AuthenticationProvider>,
);
