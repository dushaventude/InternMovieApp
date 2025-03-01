import React from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { useFormik } from "formik";
import { useAppDispatch } from '../../store';
import { ResetPasswordValidation } from "./ResetPasswordValidation";
import { resetpasswored } from "../../store/features/user/authSlice";
import { useSearchParams, Link } from "react-router-dom";
import logo from '../../../public/main_logo-removebg.png';

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const formik = useFormik({
    initialValues: {
      email: email || "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordValidation,
    onSubmit: async (values) => {
      try {
        await dispatch(resetpasswored({ email: values.email, token: token || "", NewPassword: values.newPassword }));
        console.log("Password reset successfully");
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
            Enter your new password to reset it.
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
                type="password"
                placeholder=" "
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
              />
              <label style={{ fontSize: '16px' }}>New Password</label>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="error">{formik.errors.newPassword}</div>
              ) : null}
            </div>
            <div className="login-section-input">
              <input
                type="password"
                placeholder=" "
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <label style={{ fontSize: '16px' }}>Confirm New Password</label>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
          </div>
        </form>
        <div className="login-button" onClick={() => formik.handleSubmit()} style={{ marginTop: '16px' }}>
          <p>Reset Password</p>
        </div>
        <Link to={"/login"} className="create-account">
          <p className="create-account">
            Remember your password? Sign In
          </p>
        </Link>
      </div>
      <div className="footer" style={{ marginTop: '32px' }}>
        <p>Footer content goes here</p>
      </div>
    </div>
  );
};

export default ResetPassword;
