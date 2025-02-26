// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// //import movieService from "../../../services/movieService";
// import { error } from "console";

// interface PhotoUrl {
//   Url: string;
// }

// interface MovieState {
//   movie: {
//     Id: number;
//     Title: string;
//     Description: string;
//     Photo: string;
//     IsFeatured: boolean;
//     ReleasedDate: Date;
//     PhotoUrlList: PhotoUrl[];
//   } | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: MovieState = {
//   movie: null,
//   status: "idle",
//   error: null as string | null,
// };

// export const fetchMovieById = createAsyncThunk(
//   "movie/id",
//   async (id: number, thunkAPI) => {
//     try {
//       const response = await movieService.getMovie(id);
//       console.log(response);
//       return response;
//     } catch (error) {
//       console.error(error);
//       return thunkAPI.rejectWithValue("Failed to fetch movie");
//     }
//   }
// );
// const movieSlice = createSlice({
//   name: "movie",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchMovieById.pending, (state) => {
//       state.status = "loading";
//     });
//     builder.addCase(fetchMovieById.fulfilled, (state, action) => {
//       state.status = "idle";
//       state.movie = action.payload as MovieState["movie"];
//     });
//     builder.addCase(fetchMovieById.rejected, (state, action) => {
//       state.status = "idle";
//       state.error = action.payload as string;
//     });
//   },
// });

// export default movieSlice.reducer;
