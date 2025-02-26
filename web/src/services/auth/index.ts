import { AuthParms,registerParms } from "../../models/models";
import { request } from "../api";

const Authentication = {
    login: (auth: AuthParms) =>
      request.post<any | null>(
        `https://localhost:7183/api/Auth/login`,
        JSON.stringify(auth)
      ),

      register:(auth:registerParms)=>
      request.post<any | null>(
        `https://localhost:7183/api/Auth/register`,
        JSON.stringify(auth)
      ),
   

  };
  
  export default Authentication;