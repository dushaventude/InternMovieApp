import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../../services';
import { loadingStates } from '../../../models/enum';

interface UserState {
  user: { id: string; email: string;firstName:string;lastName:string };
  role:['customer'];
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: { id: '', email: '',firstName:'',lastName:'' },
  role:['customer'],
  token: '',
  status: loadingStates.IDLE,
  error: null
};

// interface RegisterState{
//   user: { id: string; email: string };
//   token: string | null;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;

// }



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
          // name: decodedPayload.name,
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

      return rejectWithValue('Login failed');
    } catch (error: any) {
      return rejectWithValue(error || 'Login failed');
    }
  }
);


export const registerUser=createAsyncThunk(
  'user/register',
  async ({username,password,roles,firstName,lastName}:{username:string,password:string,roles:['customer'],firstName:string,lastName:string},{rejectWithValue})=>{

    try{
      const response = await agent.Authentication.register({
        username,password,roles,firstName,lastName
      });
      const token = (await response.JwtToken) as string;

      if (token) {
        console.log(token);
        //window.location.href='/';
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const decodedPayload = JSON.parse(atob(encodedPayload));
        
        const user = {
          id: decodedPayload[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ],
          // name: decodedPayload.name,
          email:
            decodedPayload[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ],
          token,
          firstName,
          lastName
        };

        return user;
      }
      return rejectWithValue('Registration failed');
    
    }catch(error:any){
      return rejectWithValue(error || 'Registeration failed');
    }
  }

)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = { id: '', email: '',firstName:'',lastName:''
       };
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
      .addCase(registerUser.pending,(state)=>{
        state.status='loading';
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
      .addCase(registerUser.rejected,(state,action)=>{
        state.status='failed';
        state.error=action.payload as string;
      })
      ;
  }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
