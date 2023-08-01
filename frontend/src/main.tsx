import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/Toaster";
import { HomeViewContainer } from "./containers/routes/HomeViewContainer";

import { ToasterProvider } from "./contexts/Toaster";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeViewContainer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToasterProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ToasterProvider>
  </React.StrictMode>
);
