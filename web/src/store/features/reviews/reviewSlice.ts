import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "../../../services/reviews/reviewService";
interface Review {
  Id: string;
  Rate: number;
  FirstName: string;
  LastName: string;
  CreatedDatetime: string;
  Comment: string;
}

const initialState: {
  review: Review | null;
  reviewList: Review[];
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: unknown | null;
} = {
  review: null,
  reviewList: [],
  createStatus: "idle",
  status: "idle",
  error: null,
};

export const getAllReviews = createAsyncThunk(
  "review/allReviews",
  async (movieId: number, thunkAPI) => {
    try {
      console.log(movieId);
      const response = await reviewService.getAllReviews(movieId);
      return response;
    } catch (error) {
      console.error("Get all failed", error);
      return thunkAPI.rejectWithValue("Failed to get movie reviews");
    }
  }
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async (
    {
      MovieId,
      Comment,
      Rate,
    }: { MovieId: number; Comment: string; Rate: number },
    thunkAPI
  ) => {
    try {
      const response = await reviewService.createReview({
        MovieId,
        Comment,
        Rate,
      });
      console.log("Review Created:", response);
      return response;
    } catch (error) {
      console.error("Update failed", error);
      return thunkAPI.rejectWithValue("Failed to update movie");
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createReview.pending, (state) => {
      state.createStatus = "loading";
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.createStatus = "idle";
      state.reviewList = [...state.reviewList, action.payload] as Review[];
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.createStatus = "idle";
      state.error = action.payload;
    });

    builder.addCase(getAllReviews.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.status = "idle";
      state.reviewList = action.payload as Review[];
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
  },
});

export default reviewSlice.reducer;
