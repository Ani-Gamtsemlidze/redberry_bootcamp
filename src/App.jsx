import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BlogContextProvider } from "./context/BlogContextProvider";
import { LoginContextProvider } from "./context/LoginContextProvider";
import { UploadBlogContext } from "./context/UploadBlogContext";
import RootLayout from "./layout/RootLayout";
import BlogDetail from "./pages/blogDetail/BlogDetail";
import BlogUpload from "./pages/blogUpload/BlogUpload";
import HomePage from "./pages/homePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },

      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
    ],
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
        <UploadBlogContext>
          <RouterProvider router={router} />
        </UploadBlogContext>
      </LoginContextProvider>
    </BlogContextProvider>
  );
}

export default App;
