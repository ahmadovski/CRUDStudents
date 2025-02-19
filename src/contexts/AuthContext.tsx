import { createContext } from "react";
import { User } from "../types/user";

export type LoginResult = "success" | "failure" | "network_error";

type AuthContextType = {
  loggedInUser: User | null;
  logOut: () => void;
  logIn: (userCredentials: UserCredentials) => Promise<LoginResult>;
};

export type UserCredentials = {
  userName: User["userName"];
  password: User["password"];
};

export const AuthContext = createContext<AuthContextType>({
  loggedInUser: null,
  logOut: () => {
    console.warn("logOut function not implimented.");
  },
  logIn: async (userCredentials: UserCredentials) => {
    console.warn("logIn function not implimented.");
    return "failure";
  },
});
