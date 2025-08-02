import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Start from "../pages/Start";
import Login from "../pages/Login";
import Search from "../pages/Home/Search";
import Like from "../pages/Home/Like";
import Enjoy from "../pages/Enjoy";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Search />,
      },
      {
        path: "like",
        element: <Like />,
      },
    ],
  },
  {
    path: "enjoy",
    element: <Enjoy />,
  },
]);
export default router;
