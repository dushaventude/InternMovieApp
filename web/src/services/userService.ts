import { request } from "./request";

const userService = {
  getUser: () => request.get("/user/profile"), // Fetch current user
  login: (credentials: { Username: string; Password: string }) =>
    request.post("/Auth/login", credentials), // Log in user
  logout: () => request.post("/auth/logout", {}), // Log out user
};

export default userService;
