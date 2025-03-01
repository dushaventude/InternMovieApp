import React from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { useFormik } from "formik";
import { useAppDispatch } from '../../store';
import { registerUser } from '../../store/features/user/authSlice';
import { RegisterPageValidation } from "./RegisterPageValidation";
import { Link } from 'react-router-dom';
import logo from '../../../public/main_logo-removebg.png';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      rePassword: "",
    },
    validationSchema: RegisterPageValidation,
    onSubmit: async (values) => {
      try {
        await dispatch(
          registerUser({
            username: values.email,
            password: values.password,
            roles: ['customer'],
            firstName: values.firstName,
            lastName: values.lastName,
          })
        );
      } catch (e) {
        console.error("There is an error", e);
      }
    },
  });

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${"https://img.freepik.com/free-photo/movie-background-collage_23-2149876010.jpg?t=st=1740803438~exp=1740807038~hmac=72bbcb46ad158a461a38ed036f068265fbcf89a119cf8375ebe17007f0505f65&w=1380"})` }}
    >
      <div className="login-header">
        <Link to={"/"}>
          <img src={logo} className="login-header-image" />
        </Link>
      </div>
      <div className="login-section">
        <div className="login-section-headers">
          <img src={logo} className="login-section-image" style={{ marginBottom: '3px' }} />
          <p className="login-section-headertext">Create Account</p>
          <p className="login-section-headersubtext">
            Sign up to explore and manage your favorite movies.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="login-section-inputs">
            <div className="login-section-input">
              <input
                type="email"
                placeholder=" "
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <label style={{ fontSize: '16px' }}>Email</label>
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="login-section-input">
              <input
                type="text"
                placeholder=" "
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              <label style={{ fontSize: '16px' }}>First Name</label>
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="login-section-input">
              <input
                type="text"
                placeholder=" "
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              <label style={{ fontSize: '16px' }}>Last Name</label>
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error">{formik.errors.lastName}</div>
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
              <label style={{ fontSize: '16px' }}>Password</label>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="login-section-input">
              <input
                type="password"
                placeholder=" "
                name="rePassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
              />
              <label style={{ fontSize: '16px' }}>Re-enter Password</label>
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <div className="error">{formik.errors.rePassword}</div>
              ) : null}
            </div>
          </div>
        </form>
        <div className="login-button" onClick={() => formik.handleSubmit()} style={{ marginTop: '16px' }}>
          <p>Sign Up</p>
        </div>
        <Link to={"/login"} className="create-account">
          <p className="create-account">
            Already have an account? Sign In
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
