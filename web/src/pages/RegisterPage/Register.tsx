import React from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { useFormik } from "formik";
import { useAppDispatch } from '../../store';
import { registerUser } from '../../store/features/user/authSlice';
import { RegisterPageValidation } from "./RegisterPageValidation";

// interface RegisterProps {}

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
              <center>Movie Hub</center>
            </div>
            <div
              className="card-header"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "32px",
                color: "black",
                alignContent: "center",
              }}
            >
              <center>Create Account</center>
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
                <div className="form-row">
                  <div className="col">
                    <Input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      className="input"
                      style={{ opacity: 0.5, border: "2px solid #000000" }}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="error">{formik.errors.firstName}</div>
                    ) : null}
                  </div>
                  <div className="col">
                    <Input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      className="input"
                      style={{ opacity: 0.5, border: "2px solid #000000" }}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="error">{formik.errors.lastName}</div>
                    ) : null}
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="input"
                      style={{ opacity: 0.5, border: "2px solid #000000" }}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <div className="col">
                    <Input
                      type="password"
                      placeholder="Re-enter Password"
                      name="rePassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.rePassword}
                      className="input"
                      style={{ opacity: 0.5, border: "2px solid #000000" }}
                    />
                    {formik.touched.rePassword && formik.errors.rePassword ? (
                      <div className="error">{formik.errors.rePassword}</div>
                    ) : null}
                  </div>
                </div>
                <Typography className="xs">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Sign In
                  </a>
                </Typography>
                <center>
                  <Button
                    variant="primary"
                    type="submit"
                    size="large"
                  >
                    Sign Up
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

export default Register;
