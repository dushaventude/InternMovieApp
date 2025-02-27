import React from 'react';
import Typography from '../../components/atoms/Typography';
import './styles.scss';
import Input from '../../components/atoms/input/Input';
import Button from '../../components/atoms/button/Button';
import { LoginPageValidation } from './LoginPageValidation';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../store';
import { loginUser } from '../../store/features/user/authSlice';

// interface LoginProps {}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginPageValidation,
    onSubmit: async (values) => {
      try {
        await dispatch(
          loginUser({ username: values.username, password: values.password })
        );

      } catch (e) {
        console.error('There is an error', e);
      }
    }
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div>
         
          {/* Set to start from the 5th column */}
          <div className="card text-center">
            <div
              className="card-header"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '32px',
                color: 'black'
              }}
            >
              <p>Welcome</p>
              <p>MovieHub</p>
            </div>

            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className="input"
                    style={{ opacity: 0.5, border: '2px solid #000000' }}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="error">{formik.errors.username}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="input"
                    style={{ opacity: 0.5, border: '2px solid #000000' }}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <Typography variant="p" className="xs">
                    <a href="/resetPw">Forgot Password?</a>
                  </Typography>
                </div>

                <center>
                  <Button variant="primary" type="submit" size="large">
                    Sign In
                  </Button>
                </center>

                <p>
                  <center style={{ fontSize: '10px' }}>
                    Don't have an account?{' '}
                    <a
                      href="/register"
                      className="text-primary"
                      style={{ fontSize: '10px' }}
                    >
                      Sign Up
                    </a>
                  </center>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
