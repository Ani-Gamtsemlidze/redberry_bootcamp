import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./components/categories/Categories";
import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import DataFetcher from "./utilis/DataFetcher";

// const Banner = () => {
//   return <h1>ბლოგი</h1>;
// };

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
