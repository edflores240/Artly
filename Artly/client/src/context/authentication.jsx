import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserAuthContext = createContext();



export const UserAuthProvider = ({ children }) => {

    const [loginError, setLoginError] = useState();


  


    const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
    );

  const handleLogin = async (values) => {
      try {
        const res = await axios.post(
            "http://localhost:8800/server/auth/login", values, {
              withCredentials: true,
            }
          );
          setCurrentUser(res.data);
      
      } catch (err) {
        setLoginError(err.response.data)
        console.log(err.response.data)
       
      }

  };

 

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserAuthContext.Provider value={{ currentUser, handleLogin, loginError }}>
      {children}
    </UserAuthContext.Provider>
  );
};
