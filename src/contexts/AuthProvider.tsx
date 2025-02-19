import { ReactNode, useEffect, useState } from "react";
import { AuthContext, LoginResult, UserCredentials } from "./AuthContext";
import { User } from "../types/user";
import { loginRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInUser, setLogedInUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const logIn = (userCredentials: UserCredentials): Promise<LoginResult> => {
    const result = loginRequest(userCredentials);
    return new Promise((resolve, reject) => {
      if (result.status === 200) {
        setLogedInUser(result.data);
        localStorage.setItem("loggedInUser", JSON.stringify(result.data));
        resolve("success");
      } else {
        reject("failure");
      }
    });
  };

  const logOut = () => {
    setLogedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  useEffect(() => {
    const unParsedLoggedInUserData = localStorage.getItem("loggedInUser");
    if (unParsedLoggedInUserData) {
      setLogedInUser(JSON.parse(unParsedLoggedInUserData));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ loggedInUser, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
