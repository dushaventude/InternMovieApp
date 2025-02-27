import React from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { useFormik } from "formik";
import { useAppDispatch } from '../../store';
import { PwResetPageValidation } from "./PwResetPageValidation";
import { forgetPassword } from "../../store/features/user/authSlice";

// interface PwResetPageProps {}

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
        console.log("Password reset link sent to:", values.email);
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

export default PwResetPage;
