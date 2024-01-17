import { useContext, useState } from "react";
import { useFormik } from "formik";
import { FiLock, FiUsers, FiMessageSquare } from "react-icons/fi";
import { MdVisibility, MdPerson, MdVisibilityOff } from "react-icons/md";
import { LoginValSchema } from "./ValidationSchema/ValidationSchema";
import axios from "axios";
import { UserAuthContext } from "../../context/authentication";
import { useNavigate } from "react-router-dom";


function Login() {
  const [showPass, setShowPass] = useState(false);
  const [showVisible, setShowVisible] = useState(false);
  
  const {handleLogin} = useContext(UserAuthContext)
  const {loginError, currentUser} = useContext(UserAuthContext)

  const navigate = useNavigate()

  const success = (content) => {
    messageApi.open({
      type: 'success',
      content: content
    });
  };
  const error = (content) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  // Submittion to the back authentication handler 
  const handleLoginSubmit = async (values) => {
    handleLogin(values)
  
    if (currentUser.id) {
      navigate("/community")
    }

  }
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginValSchema,
    onSubmit: handleLoginSubmit,
  });

  return (
    <>
      <form action="#" className="sign-in-form">
        <h2 className="title">Login</h2>
        {loginError && (
                <div
                  
                  style={{
                    backgroundColor: " #56020283",
                    color: "white",
                    border: "solid red 1px",
                    borderRadius:'10px'
                  }}>
                <div style={{width:"max-content", position:"relative", margin:'auto', textAlign:"center", padding:"10px"} }>
                     {loginError}
                </div>
                </div>
              )}
        <div className="input-field">
          <i>
            <FiUsers />
          </i>
          <input
            type="text"
            placeholder="Username or Email"
            name="username"
            value={values.username}
            onChange={handleChange}
            id="username2"
            onBlur={handleBlur}
          />
          {errors.username && touched.username  && (
            <p className="error">{errors.username || errors.email}</p>
          )}
        </div>
        <div className="input-field">
          <i onClick={() => setShowPass(!showPass)}>
            {!showPass ? <MdVisibility /> : <MdVisibilityOff />}
          </i>
          <input
            type={`${!showPass ? "password" : "text"}`}
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            id="password2"
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>
        <input
          type="submit"
          value="Login"
          className="btn solid"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
}

export default Login;
