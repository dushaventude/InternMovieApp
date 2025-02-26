import { AuthParms } from "../../models/models";
import { request } from "../api";

const Authentication = {
    login: (auth: AuthParms) =>
      request.post<any | null>(
        `https://localhost:7183/api/Auth/login`,
        JSON.stringify(auth)
      ),
   
    // loginasuserUserid: () =>
    //   request.post<any | null>(
    //     `${process.env.REACT_APP_USER_API}${process.env.REACT_APP_BASE_API_VERSION}/auth/loginasuser-userid`,
    //     {}
    //   ),
    // getAuthorizationSettingsByUser: () =>
    //   request.get<any | null>(
    //     `${process.env.REACT_APP_SURVEY_API_2}${process.env.REACT_APP_BASE_API_VERSION}/surveys/get-authorization-settings`
    //   )
  };
  
  export default Authentication;