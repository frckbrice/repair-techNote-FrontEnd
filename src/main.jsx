import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import Layout from "./components/Layout.jsx";
import Public from "./components/Public.jsx";
import Login from "./features/auth/Login.jsx";
import DashLayout from "./components/DashLayout.jsx";
import Welcome from "./features/auth/welcome.jsx";
import NoteList from "./features/notes/NoteList.jsx";
import UserList from "./features/users/UserList.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Public />,
          },

          {
            path: "/login",
            element: <Login />,
          },

          {
            element: <Prefetch />,
            children: [
              {
                path: "/dash",
                element: <DashLayout />,
                children: [
                  {
                    index: true,
                    element: <Welcome />,
                  },
                  {
                    path: "users",
                    children: [
                      {
                        index: true,
                        element: <UserList />,
                      },
                      {
                        path: ":id",
                        element: <EditUser />,
                      },
                      {
                        path: "new",
                        element: <NewUserForm />,
                      },
                    ],
                  },
                  {
                    path: "notes",
                    children: [
                      {
                        index: true,
                        element: <NoteList />,
                      },
                      {
                        path: ":id",
                        element: <EditNote />,
                      },
                      {
                        path: "new",
                        element: <NewNote />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
