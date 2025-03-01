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
  searchMovies: [];
  searchStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  fetchMovies: Movie[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: MovieState = {
  movie: null,
  status: "idle",
  carouselMovies: [],
  carouselStatus: "idle",
  searchMovies: [],
  searchStatus: "idle",
  error: null as string | null,
  fetchMovies: [],
  fetchStatus: "idle",
};

export const fetchMovieById = createAsyncThunk(
  "movie/id",
  async (id: string, thunkAPI) => {
    try {
      const response = await movieService.getMovie(id);
      console.log("Sup", response);
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

export const fetchAllMovies = createAsyncThunk(
  "movie/fetchAllMovies",
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
      console.log("Hi", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch movies"
      );
    }
  }
);
export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async ({ id, movieData }: { id: number; movieData: any }, thunkAPI) => {
    try {
      const response = await movieService.updateMovie(id, movieData);
      console.log("Updated movie:", response);
      return response;
    } catch (error) {
      console.error("Update failed", error);
      return thunkAPI.rejectWithValue("Failed to update movie");
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (id: number, thunkAPI) => {
    try {
      await movieService.deleteMovie(id);
      console.log("Deleted movie:", id);
      return id;
    } catch (error) {
      console.error("Delete failed", error);
      return thunkAPI.rejectWithValue("Failed to delete movie");
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
      console.log("API Response for searchMovies:", action.payload);
      state.searchStatus = "idle";
      state.searchMovies = action.payload;
    });
    builder.addCase(fetchSearchMovies.rejected, (state, action) => {
      state.searchStatus = "idle";
      state.error = action.payload as string;
    });

    builder.addCase(updateMovie.fulfilled, (state, action) => {
      console.log("Updated movie:", action.payload);
      state.movie = action.payload; // Store the updated movie
    });

    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      console.log("Current searchMovies state:", state.searchMovies);
      console.log("Type of searchMovies:", typeof state.searchMovies);
      // Convert `searchMovies` to a plain array before filtering
      const searchMoviesArray = Array.isArray(state.searchMovies)
        ? state.searchMovies
        : Object.values(state.searchMovies);
      if (!Array.isArray(state.searchMovies)) {
        console.error(
          "Error: searchMovies is not an array!",
          state.searchMovies
        );
        return;
      }
      console.log("Converted searchMoviesArray:", searchMoviesArray);
      console.log("Deleted movie:", action.payload);
      // Create a new array to ensure Redux detects the state change
      state.searchMovies = [
        ...state.searchMovies.filter((movie) => movie.Id !== action.payload),
      ];
    });

    builder.addCase(fetchAllMovies.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
      state.fetchStatus = "idle";
      state.fetchMovies = action.payload;
    });
    builder.addCase(fetchAllMovies.rejected, (state, action) => {
      state.fetchStatus = "idle";
      state.error = action.payload as string;
    });
  },
});

export const { clearSearchMovies } = movieSlice.actions;

export default movieSlice.reducer;
