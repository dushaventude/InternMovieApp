import React from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { Box } from "lucide-react";

// interface LoginProps {}

const Login: React.FC = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-header" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: 'black' }}>
              <center>Welcome Back!</center>
            </div>
            <div className="card-header" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: 'black', alignContent: 'center' }}>
              <center>Movie Hub</center>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <Input type="email" placeholder="Enter your email" className="input" style={{ opacity: 0.5, border: "2px solid #000000" }} />
                </div>
                <div className="form-group">
                  <Input type="password" placeholder="Enter your password" className="input" style={{ opacity: 0.5, border: "2px solid #000000" }} />
                </div>
                <center><Button variant="primary" type="submit" size="large">Sign In</Button></center>
               
                  <p> <center style={{fontSize:'10px'}}>Don't have an account?{" "}
                  
                  <a href="/register" className="text-primary" style={{ fontSize: '10px' }}>
                    Sign Up
                  </a></center>
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