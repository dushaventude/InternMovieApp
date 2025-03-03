import React from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { LoginPageValidation } from "./LoginPageValidation";
import { useFormik } from "formik";
import { useAppDispatch } from "../../store";
import { loginUser } from "../../store/features/user/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../public/main_logo-removebg.png";
import { useNotification } from "../../contexts/NotificationContext";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useNotification();

  // This is the route to redirect to after login
  const from = location.state?.from || "/";

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginPageValidation,
    onSubmit: async (values) => {
      try {
        await dispatch(
          loginUser({ username: values.username, password: values.password })
        );

        // showNotification("Login successful!", "success");
        // navigate(from, { replace: true });
      } catch (e) {
        showNotification("user name or password incorrect", "error");
          console.error("There is an error", e);
      }
    },
  });

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${"https://img.freepik.com/free-photo/movie-background-collage_23-2149876010.jpg?t=st=1740803438~exp=1740807038~hmac=72bbcb46ad158a461a38ed036f068265fbcf89a119cf8375ebe17007f0505f65&w=1380"})`,
      }}
    >
      <div className="login-header">
        <Link to={"/"}>
          <img src={logo} className="login-header-image" />
        </Link>
      </div>
      <div className="login-section">
        <div className="login-section-headers">
          <img
            src={logo}
            className="login-section-image"
            style={{ marginBottom: "3px" }}
          />
          <p className="login-section-headertext">Welcome Back!</p>
          <p className="login-section-headersubtext">
            Sign in to explore and manage your favorite movies.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="login-section-inputs">
            <div className="login-section-input">
              <input
                type="email"
                placeholder=" "
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              <label style={{ fontSize: "16px" }}>Email</label>
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="login-section-input">
              <input
                type="password"
                placeholder=" "
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <label style={{ fontSize: "16px" }}>Password</label>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
        </form>
        <Link to={"/resetPw"} className="forgot-password">
          <p className="forgot-password">Forgot Password</p>
        </Link>
        <Button className="login-button" onClick={() => formik.handleSubmit()}>
          <p>Sign In</p>
        </Button>
        <Link to={"/register"} className="create-account">
          <p className="create-account">
            Don't have an account yet? Register now!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
