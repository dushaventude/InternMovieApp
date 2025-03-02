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
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: unknown | null;
} = {
  review: null,
  reviewList: [],
  createStatus: "idle",
  deleteStatus: "idle",
  status: "idle",
  error: null,
};

export const getAllReviews = createAsyncThunk(
  "review/allReviews",
  async (movieId: number, thunkAPI) => {
    try {
      // console.log(movieId);
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
      await new Promise((resolve) => setTimeout(resolve, 10000));
      // console.log("Review Created:", response);
      return response;
    } catch (error) {
      console.error("Update failed", error);
      return thunkAPI.rejectWithValue("Failed to update movie");
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId: number, thunkAPI) => {
    try {
      const response = await reviewService.deleteReview(reviewId);
      await new Promise((resolve) => setTimeout(resolve, 10000));

      return response;
    } catch (error) {
      console.error("Delete failed", error);
      return thunkAPI.rejectWithValue("Failed to delete movie");
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    removeReview: (state, action) => {
      state.reviewList = state.reviewList.filter(
        (review) => review.Id !== action.payload
      );
    },
  },
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

    builder.addCase(deleteReview.pending, (state) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(deleteReview.fulfilled, (state) => {
      state.deleteStatus = "idle";
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.deleteStatus = "idle";
      state.error = action.payload;
    });
  },
});

export default reviewSlice.reducer;

export const { removeReview } = reviewSlice.actions;
