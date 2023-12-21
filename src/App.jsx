import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogDetail from "./pages/blogDetail/BlogDetail";
import HomePage from "./pages/homePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetail />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
