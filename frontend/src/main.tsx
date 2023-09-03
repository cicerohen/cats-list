import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/Toaster";
import { HomePage } from "./pages/home";
import { ToasterProvider } from "./components/toaster/toaster-context";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToasterProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ToasterProvider>
  </React.StrictMode>,
);
