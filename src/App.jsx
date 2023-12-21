import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogContext from "./context/BlogContext";
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
  return (
    <BlogContext>
      <RouterProvider router={router} />
    </BlogContext>
  );
}

export default App;
