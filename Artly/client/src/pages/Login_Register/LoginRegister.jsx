import Password from "antd/es/input/Password";
import "./LoginRegister.scss";
import { useContext, useState } from "react";
import { FiLock, FiUsers, FiMessageSquare } from "react-icons/fi";
import { MdVisibility, MdPerson, MdVisibilityOff } from "react-icons/md";
import axios, { formToJSON } from "axios";
import { useFormik } from "formik";
import Login from "./Login";
import { ValidationSchema } from "./ValidationSchema/ValidationSchema";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../context/authentication";




function LoginRegister() {
 
  const [signInMode, setSignInMode] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showVisible, setShowVisible] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [regSuccess, setRegSuccess]  = useState()
  const navigate = useNavigate()

  const {handleLogin} = useContext(UserAuthContext)


  const handleCreateAccountSubmit = async (value) => {
    setRegisterError(null)
    try {
      await axios.post("http://localhost:8800/server/auth/register", value)

    } catch (err) {
    setRegisterError(err.response.data);
    }

    if (registerError === null){
      handleLogin({username: value.username , password: value.password})
      navigate("/community")
    }
  };



  const {values,errors,touched,isSubmitting,handleBlur,handleChange,handleSubmit,} = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: handleCreateAccountSubmit,
  });



 
  const errorStyle = {border: "solid red 1px", backgroundColor:"#ff000031", color: "white"}

 

  return (
    <div className="login-register">
      <div className={`container ${!signInMode ? "" : " sign-up-mode"}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <Login/>
            <form method="post" className="sign-up-form" onSubmit={handleSubmit} autoComplete="off">
              <h2 className="title">Create Account</h2>
              {registerError && (
                <div
                  
                  style={{
                    backgroundColor: " #56020283",
                    color: "white",
                    border: "solid red 1px",
                    borderRadius:'10px'
                  }}>
                <div style={{width:"max-content", position:"relative", margin:'auto', textAlign:"center", padding:"10px"} }>
                     {registerError}
                </div>
                </div>
              )}
              <div className="input-field" style={errors.name && touched.name ? errorStyle : {}}>
                <i>
                  <MdPerson />
                </i>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                    onChange={handleChange}
                    id="name"
                    onBlur={handleBlur}
                    
                />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="input-field" style={errors.username && touched.username ? errorStyle : {}}>
                <i>@</i>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                    onChange={handleChange}
                    id="username"
                    onBlur={handleBlur}
                />
                {errors.username && touched.username && <p className="error">{errors.username}</p>}
              </div>
              <div className="input-field" style={errors.email && touched.email ? errorStyle : {}}>
                <i>
                  <FiMessageSquare />
                </i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                    onChange={handleChange}
                    id="email"
                    onBlur={handleBlur}
                />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="input-field" style={errors.password && touched.password ? errorStyle : {}}>
                <i onClick={() => setShowPass(!showPass)}>
                  {!showPass ? <MdVisibility /> : <MdVisibilityOff />}
                </i>
                <input
                  type={`${!showPass ? "password" : "text"}`}
                  placeholder="Password"
                  name="password"
                  value={values.password}
                    onChange={handleChange}
                    id="password"
                    onBlur={handleBlur}
                />
                {errors.password && touched.password && <p className="error">{errors.password}</p>}
              </div>

              <input
                type="submit"
                className="btn"
                value="Sign up"
                disabled={isSubmitting}
              />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Don't Have an Account?</h3>
              <p>Become One Of us and Unleash your creative Imagination</p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => setSignInMode(true) || setShowPass(false)}
              >
                Register
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already Have an Account?</h3>
              <p>Share Your Imagination now!</p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() => setSignInMode(false) || setShowPass(false)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
