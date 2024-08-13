import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, baseURL } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfor, setRegisterInfor] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfor, setLoginInfor] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  console.log("User", user);
  console.log("loginInfor", loginInfor);

  useEffect(() => {  
    const user = localStorage.getItem("User");  
    if (user) {  
        try {  
          setUser(JSON.parse(user));  
        } catch (error) {  
            console.error( error);  
            // localStorage.removeItem("User");  
        }  
    }  
}, []);  

  useEffect(() => {  
    const token = localStorage.getItem('token');  
    if (token) {  
      setIsLoggedIn(true); // User is logged in  
    }  
    console.log("token from Local:", token)
  }, []);


  //   this is a hook to update the register data without refreshing everytime we render
  // the infor here is the input data of the Register form
  const updateRegisterInfor = useCallback((infor) => {
    setRegisterInfor(infor);
  }, []);

  const updateLoginInfor = useCallback((infor) => {
    setLoginInfor(infor);
  }, []);

  //a function to let us register a user; we need to add event "e" to prevent the auto refreshing whenever we click submit in Regiser.jsx.
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      const response = await postRequest(
        `${baseURL}/users/signup`,
        JSON.stringify(registerInfor)
      );

      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }

      //this will keep the user login whenever we refresh the page
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfor]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      if (!loginInfor.email || !loginInfor.password) {
        return setLoginError("Email and Password are required.");
      }

      try {
        const response = await fetch(`${baseURL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfor),
        });

        console.log("Raw response:", response);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Login failed.");
        }

        const userData = await response.json();
        console.log("User Data from API:", userData);

        //save user and token to local storage
        localStorage.setItem("User", JSON.stringify(userData.name));
        localStorage.setItem("Token", userData.token);

        //user infor
        const userInfo = localStorage.getItem("User");
        console.log("user in localSto:", userInfo)

        //user token
        const userToken = localStorage.getItem("Token");
        console.log('Login successful! Token stored:', userToken);
        setUser(userData.name);
        window.location.href = "/"; // Navigate using window.location
        
      } catch (error) {
        console.error("Login failed:", error.message);
        setLoginError(error.message);
      } 
      setIsLoginLoading(false);

    },
    [loginInfor]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfor,
        updateRegisterInfor,
        registerError,
        registerUser,
        isRegisterLoading,
        logoutUser,
        loginError,
        loginInfor,
        loginUser,
        isLoginLoading,
        updateLoginInfor,
        isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};