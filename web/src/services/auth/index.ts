import {
  AuthParms,
  emailParms,
  registerParms,
  resetParms,
} from "../../models/models";
import { request } from "../api";

const Authentication = {
  login: (auth: AuthParms) =>
    request.post<any | null>(
      `http://localhost:5140/api/Auth/login`,
      JSON.stringify(auth)
    ),

  register: (auth: registerParms) =>
    request.post<any | null>(
      `https://localhost:7183/api/Auth/register`,
      JSON.stringify(auth)
    ),
  forgetPassword: (email: emailParms) =>
    request.post<any | null>(
      `https://localhost:7183/api/Auth/forgot-password`,
      JSON.stringify(email)
    ),
  resetPassword: (reset: resetParms) =>
    request.post<any | null>(
      `https://localhost:7183/api/Auth/reset-password`,
      JSON.stringify(reset)
    ),
};

export default Authentication;
