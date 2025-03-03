// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpensePage";
import Reports from "./pages/Reports";
import { Dark, Login, Signup, AuthLayout} from "./Component/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/Login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/Signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/add-expense",
        element: (
          <AuthLayout authentication>
            <AddExpense />
          </AuthLayout>
        ),
      },
      {
        path: "/expenses",
        element: (
          <AuthLayout authentication>
            <ExpenseList />
          </AuthLayout>
        ),
      },
      {
        path: "/reports",
        element: (
          <AuthLayout authentication>
            <Reports />
          </AuthLayout>
        ),
      },
      {
        path: "",
        element: (
          <AuthLayout authentication>
            <Dark />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>,
);
