import React, { useState } from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { Box } from "lucide-react";
import axios from "axios";

// interface LoginProps {}

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://localhost:7183/api/Auth/login`, {
        username,
        password,
      });

      const token = response.data.JwtToken;

      if (token) {
        console.log("token" + token);
        sessionStorage.setItem("token", token);

        const tokenParts = token.split(".");
        const encodedPayload = tokenParts[1];
        const decodePayload = JSON.parse(atob(encodedPayload));
        const userRole = decodePayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        console.log("role" + userRole);
        if (userRole === "Admin") {
          window.location.href = "/admin";
        } else if (userRole === "customer") {
          window.location.href = "/home";
        }
      }
    } catch (e) {
      console.error("there is an error", e);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 offset-md-2"> {/* Set to start from the 5th column */}
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
                  <Input type="email" placeholder="Enter your email" className="input" onChange={(e) => setUsername(e.target.value)} style={{ opacity: 0.5, border: "2px solid #000000" }} />
                </div>
                <div className="form-group">
                  <Input type="password" placeholder="Enter your password" className="input" onChange={(e) => setPassword(e.target.value)} style={{ opacity: 0.5, border: "2px solid #000000" }} />
                </div>
                <div>
                  <Typography variant="p" className="xs"><a href="/resetPw">Forgot Password?</a></Typography>
                </div>
                <center><Button variant="primary" type="submit" size="large" onClick={handleClick}>Sign In</Button></center>
                <p>
                  <center style={{ fontSize: '10px' }}>Don't have an account?{" "}
                    <a href="/register" className="text-primary" style={{ fontSize: '10px' }}>
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