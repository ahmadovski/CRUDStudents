import * as Yup from "yup";
export const loginSchema = Yup.object({
  userName: Yup.string().required("Name is required"),
  password: Yup.string().required("Enter your password ."),
});
export const createAccountSchema = Yup.object({
  userName: Yup.string().required("Name is required"),
  password: Yup.string().required("Enter your password ."),
  email: Yup.string().email().required("Enter a valid Email."),
});
