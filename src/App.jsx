import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Header />,
  //   children:[

  //   ]
  // },
  // {
  //   path: "/",
  //   element: <Categories />,
  // },
  {
    path: "/",
    element: <HomePage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
