import React, { useState } from "react";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import { Box } from "lucide-react";
import axios from "axios";

// interface LoginProps {}

const Register: React.FC = () => {

  const[email,setEmail]=useState("");
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[password,setPassword]=useState("");
  const[rePassword,setRePassword]=useState("");//TODO: add validation for password and rePassword

  const handleClick = async(e:{preventDefault:()=>void})=>{
    e.preventDefault();
    try{
      const response=await axios.post(`https://localhost:7183/api/Auth/register`,
        {
          Username: email, 
          Password: password,
          Roles: ["customer"],
          FirstName: firstName,
          LastName: lastName
        }
      );
      if(response.status===200){
        window.location.href="/login";
      }else{
        console.log("user registration unsuccessful");
      }
      
      
    }catch(e){
      console.error("there is an error",e);
    }
  }



  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-header" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: 'black' }}>
              <center>Movie Hub</center>
            </div>
            <div className="card-header" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: 'black', alignContent: 'center' }}>
              <center>Create Account</center>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <Input type="email" placeholder="Enter your email" className="input" style={{ opacity: 0.5, border: "2px solid #000000" }} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-row">
                  <div className="col">
                    <Input type="text" placeholder="First Name" className="input" style={{ opacity: 0.5, border: "2px solid #000000" }} onChange={(e) => setFirstName(e.target.value)}/>
                  </div>
                  <div className="col">
                    <Input type="text" placeholder="Last Name" className="input" style={{ opacity: 0.5, border: "2px solid #000000" }} onChange={(e) => setLastName(e.target.value)}/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <Input type="password" placeholder="Password" className="input" style={{ opacity: 0.5, border: "2px solid #000000" }} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div className="col">
                    <Input type="password" placeholder="Re-enter Password" className="input" style={{ opacity: 0.5, border: "2px solid #000000" }} onChange={(e) => setRePassword(e.target.value)} />
                  </div>
                </div>
                <Typography className="xs">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary" style={{ fontSize: '10px' }}>
                    Sign In
                  </a>
                </Typography>
                <center><Button variant="primary" type="submit" size="large" onClick={handleClick}>Sign Up</Button></center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;