import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../../services';
import { loadingStates } from '../../../models/enum';

interface UserState {
  user: { id: string; email: string };
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: { id: '', email: '' },
  token: '',
  status: loadingStates.IDLE,
  error: null
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }: { username: string; password: string },  { rejectWithValue }) => {
    try {
      const response = await agent.Authentication.login({ username, password });
      const token = (await response.JwtToken) as string;

      if (token) {
        console.log(token);
        // sessionStorage.setItem('token', token);
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const decodedPayload = JSON.parse(atob(encodedPayload));
        const userRole =
          decodedPayload[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];

          console.log(userRole);
        if (userRole === 'admin') {
          window.location.href = '/';
        } else {
          window.location.href = '/login';
        }
        const user = {
          id: decodedPayload[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ],
          // name: decodedPayload.name,
          email:
            decodedPayload[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ],
          token
        };

        return user;
      }

      return rejectWithValue('Login failed');
    } catch (error: any) {
      return rejectWithValue(error || 'Login failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = { id: '', email: '' };
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = {
          id: payload.id,
          email: payload.email
        };
        state.token = payload.token;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
