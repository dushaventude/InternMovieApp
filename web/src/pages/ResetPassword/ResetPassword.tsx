import React from "react";
import Typography from "../../components/atoms/Typography";
import "./sytles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { useFormik } from "formik";
import { useAppDispatch } from '../../store';
import { ResetPasswordValidation } from "./ResetPasswordValidation";
import { forgetPassword, resetpasswored } from "../../store/features/user/authSlice";
import { useSearchParams } from "react-router-dom";

// interface PwResetPageProps {}

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div
              className="card-header"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "32px",
                color: "black",
              }}
            >
              <center>Reset Your Password</center>
            </div>
            
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="input"
                    style={{ opacity: 0.5, border: "2px solid #000000" }}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    name="newPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    className="input"
                    style={{ opacity: 0.5, border: "2px solid #000000" }}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="error">{formik.errors.newPassword}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className="input"
                    style={{ opacity: 0.5, border: "2px solid #000000" }}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>

                <center>
                  <Button variant="primary" type="submit" size="large">
                    Send Password Reset Link
                  </Button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
