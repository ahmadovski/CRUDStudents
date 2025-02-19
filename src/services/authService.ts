import { User } from "../types/user";
import { toast } from "react-toastify";

// const API_URL = "https://crudstudents-m9bj.onrender.com/students"; // Update endpoint
// const API_URL = "http://localhost:3000/users"; // Update endpoint

export const createUser = (newUser: Omit<User, "id">): Promise<string> => {
  const userWithId = {
    ...newUser,
    id: Math.random().toString() + Date.now().toString(),
  }; //add id
  const storedUsersData = localStorage.getItem("users");
  const allUsers = storedUsersData ? JSON.parse(storedUsersData) : [];
  return new Promise((res, rej) => {
    if (allUsers.find((user: User) => user.userName === newUser.userName)) {
      toast.error("user name is taken. please enter another one.");
      rej("something went wrrrong");
    }

    allUsers.push(userWithId);
    localStorage.setItem("users", JSON.stringify(allUsers));
    toast.success(
      "your account has successfully been created. log in to your account"
    );
    res("succsess");
  });
};

export const loginRequest = (userCredentials: {
  userName: User["userName"];
  password: User["password"];
}): { status: number; data: User | null } => {
  const storedUsersData = localStorage.getItem("users");
  if (storedUsersData) {
    const storedUserData: User | undefined = JSON.parse(storedUsersData).find(
      (user: User) =>
        user.userName === userCredentials.userName &&
        user.password === userCredentials.password
    );
    if (storedUserData) {
      return { status: 200, data: storedUserData };
    } else {
      return { status: 404, data: null };
    }
  } else {
    return { status: 400, data: null };
  }
};
