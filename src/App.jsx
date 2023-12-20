import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";

// const Banner = () => {
//   return <h1>ბლოგი</h1>;
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
  {
    path: "home",
    element: <HomePage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
