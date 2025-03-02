import React from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { useFormik } from "formik";
import { useAppDispatch } from '../../store';
import { PwResetPageValidation } from "./PwResetPageValidation";
import { forgetPassword } from "../../store/features/user/authSlice";
import { Link } from 'react-router-dom';
import logo from '../../../public/main_logo-removebg.png';

const PwResetPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: PwResetPageValidation,
    onSubmit: async (values) => {
      try {
        await dispatch(forgetPassword({ email: values.email }));
        // console.log("Password reset link sent to:", values.email);
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
          <p className="login-section-headertext">Reset Your Password</p>
          <p className="login-section-headersubtext">
            Enter your email to receive a password reset link.
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
          </div>
        </form>
        <div className="login-button" onClick={() => formik.handleSubmit()} style={{ marginTop: '16px' }}>
          <p>Send Password Reset Link</p>
        </div>
        <Link to={"/login"} className="create-account">
          <p className="create-account">
            Remember your password? Sign In
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PwResetPage;
