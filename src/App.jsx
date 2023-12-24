import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BlogContextProvider } from "./context/BlogContextProvider";
import { LoginContextProvider } from "./context/LoginContextProvider";
import BlogDetail from "./pages/blogDetail/BlogDetail";
import BlogUpload from "./pages/BlogUpload/BlogUpload";
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
  {
    path: "/addblog",
    element: <BlogUpload />,
  },
]);
function App() {
  return (
    <BlogContextProvider>
      <LoginContextProvider>
        <RouterProvider router={router} />
      </LoginContextProvider>
    </BlogContextProvider>
  );
}

export default App;
