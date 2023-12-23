import { createContext, useContext, useEffect, useState } from "react";
import useDataFetcherPost from "../utilis/useDataFetchPost";

export const LoginThemeContext = createContext();
function LoginContextProvider(props) {
  const [userEmail, setUserEmail] = useState("");
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);

  const { responseData, isLoading, error } = useDataFetcherPost(
    "https://api.blog.redberryinternship.ge/api/login",
    userEmail
  );

  const handleRequest = () => {
    if (responseData) {
      console.log("Email exists:", responseData);
      setIsEmailExist(true);
    } else if (error) {
      setEmailNotFound(true);
      console.log("Error occurred:", error);
    }
  };

  return (
    <LoginThemeContext.Provider
      value={{
        isEmailExist,
        handleRequest,
        setUserEmail,
        emailNotFound,
        userEmail,
      }}
    >
      {props.children}
    </LoginThemeContext.Provider>
  );
}

function useLogin() {
  const context = useContext(LoginThemeContext);
  if (!context)
    throw new Error("useBlogs must be used within a BlogContextProvider");
  return context;
}

export { LoginContextProvider, useLogin };
