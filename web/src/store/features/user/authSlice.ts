import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../../services';
import { loadingStates } from '../../../models/enum';

interface UserState {
  user: { id: string; email: string; firstName: string; lastName: string };
  role: ['customer'];
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: { id: '', email: '', firstName: '', lastName: '' },
  role: ['customer'],
  token: '',
  status: loadingStates.IDLE,
  error: null
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await agent.Authentication.login({ username, password });
      const token = (await response.JwtToken) as string;

      if (token) {
        console.log(token);
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const decodedPayload = JSON.parse(atob(encodedPayload));
        const userRole =
          decodedPayload[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];

        if (userRole === 'admin') {
          window.location.href = '/';
        } 
        if(userRole==='customer'){
          window.location.href='/';
        }
        const user = {
          id: decodedPayload[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ],
          email:
            decodedPayload[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ],
          token,
          firstName: decodedPayload.firstName || '',
          lastName: decodedPayload.lastName || ''
        };

        return user;
      }

      //TODO:invalid login message
      return rejectWithValue('Login failed');
    } catch (error: any) {
      return rejectWithValue(error || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, password, roles, firstName, lastName }: { username: string, password: string, roles: ['customer'], firstName: string, lastName: string }, { rejectWithValue }) => {
    try {
      const response = await agent.Authentication.register({
        username, password, roles, firstName, lastName
      });

      if (response) {
        console.log(response.data);
        alert('User created successfully');
        window.location.href = '/login'; // Navigate to login page after successful registration
        return response.data;
      }
      return rejectWithValue('Registration failed');
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const forgetPassword = createAsyncThunk(
  'user/forgot-password',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await agent.Authentication.forgetPassword({email});
      if (response) {
        console.log(response.data);
        alert('Password reset link sent to your email');
        window.location.href = '/login';
        return response.data;
      }
      return rejectWithValue('Password reset failed');
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Please try again');
    }
  }
);

export const resetpasswored = createAsyncThunk(
  'user/reset-password',
  async ({ email, token, NewPassword }: { email: string, token: string, NewPassword: string }, { rejectWithValue }) => {
    try {
      const response = await agent.Authentication.resetPassword({ email, token, NewPassword });
      if (response) {
        console.log(response.data);
        alert('Password reset successfully');
        window.location.href = '/login';
        return response.data;
      }
      return rejectWithValue('Password reset failed');
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Please try again');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = { id: '', email: '', firstName: '', lastName: '' };
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
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName
        };
        state.token = payload.token;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = {
          id: payload.id,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName
        };
        state.token = payload.token;
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        alert('Password reset link sent successfully');
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
