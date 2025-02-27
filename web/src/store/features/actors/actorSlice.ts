import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import actorService from "../../../services/actors/actorService";

interface IActor {
  Id: number;
  Name: string;
  Photo: string;
  DOB: string;
}

interface ActorState {
  actor: IActor | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  fetchActors: IActor[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ActorState = {
  actor: null,
  status: "idle",
  fetchActors: [],
  fetchStatus: "idle",
  error: null,
};

export const fetchAllActors = createAsyncThunk(
  "actor/fetchAllActors",
  async (
    { pageNumber, pageSize }: { pageNumber: number; pageSize: number },
    thunkAPI
  ) => {
    try {
      const response = await actorService.getAllActors(pageNumber, pageSize);
      return response;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch actors");
    }
  }
);

const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllActors.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(fetchAllActors.fulfilled, (state, action) => {
      state.fetchStatus = "succeeded";
      state.fetchActors = action.payload;
    });
    builder.addCase(fetchAllActors.rejected, (state, action) => {
      state.fetchStatus = "failed";
      state.error = action.payload as string;
    });
  },
});

export const selectActor = (state: { actors: ActorState }) =>
  state.actors.actor;

export default actorSlice.reducer;
