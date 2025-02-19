import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Link,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./i18n";
import "chart.js/auto"; // register default plagins automaticaly
import CreateAccount from "./pages/CreateAccount.tsx";
import Login from "./pages/Login.tsx";
import Root from "./layout/Root.tsx";
import Home from "./pages/Home.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>error</p>,
    children: [
      {
        path: "/",
        loader: async () => {
          const unParsedUser = localStorage.getItem("loggedInUser");
          const user = unParsedUser ? JSON.parse(unParsedUser) : null;
          if (!user) {
            throw redirect("/login");
          }
          return redirect("/home");
        },
        element: (
          <>
            <h1>welcome to this app</h1>
            <Link to='/login'> log in</Link>
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/createAccount",
        element: <CreateAccount />,
      },
      {
        path: "/home",
        element: <Home />,
        loader: async () => {
          const unParsedUser = localStorage.getItem("loggedInUser");
          const user = unParsedUser ? JSON.parse(unParsedUser) : null;
          if (!user) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: async () => {
          const unParsedUser = localStorage.getItem("loggedInUser");
          const user = unParsedUser ? JSON.parse(unParsedUser) : null;
          if (!user) {
            throw redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
