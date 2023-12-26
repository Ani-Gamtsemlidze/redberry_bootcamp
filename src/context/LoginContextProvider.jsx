import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const LoginThemeContext = createContext();
function LoginContextProvider(props) {
  const [userEmail, setUserEmail] = useState("");
  const [active, setActive] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  // const [error, setError] = useState(false);
  const [responseData, setResponseData] = useState();
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);

  const BASE_URL = "https://api.blog.redberryinternship.ge/api/login";

  useEffect(() => {
    const storedEmail = localStorage.getItem("mail");
    if (storedEmail) {
      // setUserEmail(storedEmail);
      setActive(true);
    }
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.post(BASE_URL, {
        email: userEmail,
      });
      setResponseData(response);
      if (response) {
        // console.log("Email exists:", response);
        setIsEmailExist(true);
        setActive(true);

        localStorage.setItem("mail", userEmail);
      }
    } catch (err) {
      console.error("Axios error:", err);
      setEmailNotFound(true);
    }
  };

  function handleLogin() {
    setIsPopUp(true);
  }

  function handleClose() {
    setIsPopUp(!isPopUp);
    setUserEmail("");
    setEmailNotFound(false);
  }

  function handleSuccessLogin() {
    setIsPopUp(!isPopUp);
  }

  return (
    <LoginThemeContext.Provider
      value={{
        isEmailExist,
        handleRequest,
        setUserEmail,
        emailNotFound,
        userEmail,
        active,
        isPopUp,
        handleLogin,
        handleClose,
        handleSuccessLogin,
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
