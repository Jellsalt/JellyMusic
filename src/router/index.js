import { createBrowserRouter } from "react-router-dom";

import Start from "../pages/Start";
import { AuthRoute } from "@/components/AuthRoute";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Search = lazy(() => import("@/pages/Home/Search"));
const Like = lazy(() => import("@/pages/Home/Like"));
const Enjoy = lazy(() => import("@/pages/Enjoy"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={"loading..."}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/home",
    element: (
      <AuthRoute>
        <Suspense fallback={"loading..."}>
          <Home />
        </Suspense>
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={"loading..."}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "like",
        element: (
          <Suspense fallback={"loading..."}>
            <Like />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "enjoy",
    element: (
      <Suspense fallback={"loading..."}>
        <Enjoy />
      </Suspense>
    ),
  },
]);
export default router;
