import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../../services/userService";

interface UserState {
  user: { id: string; name: string; email: string } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { Username: string; Password: string }, thunkAPI) => {
    try {
      const response = await userService.login(credentials);
      const token = await response.JwtToken;

      if (token) {
        sessionStorage.setItem("token", token);
        const tokenParts = token.split(".");
        const encodedPayload = tokenParts[1];
        const decodedPayload = JSON.parse(atob(encodedPayload));
        const userRole =
          decodedPayload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        if (userRole === "Admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
