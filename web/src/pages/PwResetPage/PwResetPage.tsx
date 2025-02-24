import React from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { Box } from "lucide-react";

// interface LoginProps {}

const PwResetPage: React.FC = () => {
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
              <form>
                <div className="form-group">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="input"
                    style={{ opacity: 0.5, border: "2px solid #000000" }}
                  />
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
