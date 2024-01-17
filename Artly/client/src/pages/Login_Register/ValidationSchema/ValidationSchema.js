import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const ValidationSchema = yup.object().shape({
    name: yup.string().max(20).required("Name is required"),
    username: yup.string().max(20).required("Username is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password is required"),
});

export const LoginValSchema = yup.object().shape({
  username: yup.string().required("Username or Email is required"),
  password: yup.string().min(5).required("Password is required"),
})