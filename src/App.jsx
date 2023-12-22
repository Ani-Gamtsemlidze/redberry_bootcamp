import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BlogContextProvider } from "./context/BlogContextProvider";
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
    <BlogContextProvider>
      <RouterProvider router={router} />
    </BlogContextProvider>
  );
}

export default App;
