import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomeViewContainer } from "./containers/routes/HomeViewContainer";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeViewContainer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
