import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieService from "../../../services/movies/movieService";

interface PhotoUrl {
  Url: string;
}

interface Movie {
  Id: number;
  Title: string;
  Description: string;
  Photo: string;
  IsFeatured: boolean;
  ReleasedDate: Date;
  PhotoUrlList: PhotoUrl[];
}

interface MovieState {
  movie: Movie | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  carouselMovies: Movie[];
  carouselStatus: "idle" | "loading" | "succeeded" | "failed";
  searchMovies: Movie[];
  searchStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MovieState = {
  movie: null,
  status: "idle",
  carouselMovies: [],
  carouselStatus: "idle",
  searchMovies: [],
  searchStatus: "idle",
  error: null as string | null,
};

export const fetchMovieById = createAsyncThunk(
  "movie/id",
  async (id: string, thunkAPI) => {
    try {
      const response = await movieService.getMovie(id);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch movie");
    }
  }
);

export const fetchMoviesCarousel = createAsyncThunk(
  "movie/fetchMoviesCarousel",
  async (
    filters: {
      Query: string;
      ReleaseDateFrom: string;
      ReleaseDateTo: string;
      IsFeatured: boolean;
      PageSize: number;
      PageNumber: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await movieService.getAllMovies(filters);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch movies"
      );
    }
  }
);
export const fetchSearchMovies = createAsyncThunk(
  "movie/fetchSearchMovies",
  async (
    filters: {
      Query: string;
      ReleaseDateFrom: string;
      ReleaseDateTo: string;
      IsFeatured?: boolean;
      PageSize: number;
      PageNumber: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await movieService.getAllMovies(filters);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch movies"
      );
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearSearchMovies: (state) => {
      state.searchMovies = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      state.status = "idle";
      state.movie = action.payload as MovieState["movie"];
    });
    builder.addCase(fetchMovieById.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload as string;
    });

    builder.addCase(fetchMoviesCarousel.pending, (state) => {
      state.carouselStatus = "loading";
    });
    builder.addCase(fetchMoviesCarousel.fulfilled, (state, action) => {
      state.carouselStatus = "idle";
      state.carouselMovies = action.payload;
    });
    builder.addCase(fetchMoviesCarousel.rejected, (state, action) => {
      state.carouselStatus = "idle";
      state.error = action.payload as string;
    });

    builder.addCase(fetchSearchMovies.pending, (state) => {
      state.searchStatus = "loading";
    });
    builder.addCase(fetchSearchMovies.fulfilled, (state, action) => {
      state.searchStatus = "idle";
      state.searchMovies = action.payload;
    });
    builder.addCase(fetchSearchMovies.rejected, (state, action) => {
      state.searchStatus = "idle";
      state.error = action.payload as string;
    });
  },
});

export const { clearSearchMovies } = movieSlice.actions;

export default movieSlice.reducer;
