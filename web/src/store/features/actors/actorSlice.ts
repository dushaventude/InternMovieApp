import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import actorService from "../../../services/actors/actorService";
import { ReactNode } from "react";

interface IActor {
  DOB: ReactNode;
  Photo: string | undefined;
  Id: number;
  Name: string;
  Gender: string;
  Country: string;
}
interface ActorApiResponse {
  PageNumber: number;
  PageSize: number;
  TotalCount: number;
  Response: IActor[];
}

interface ActorState {
  actor: IActor | null;
  status: "idle" | "loading" | "succeeded" | "failed";

  fetchActors: { TotalCount: number; Response: IActor[] };
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ActorState = {
  actor: null,
  status: "idle",

 // fetchActors: null, // Change to null to match API structure

  fetchActors: { TotalCount: 0, Response: [] },

  fetchStatus: "idle",
  error: null,
};

export const createActor = createAsyncThunk(
  "actor/createActor",
  async (actor: IActor, thunkAPI) => {
    try {
      const response = await actorService.createActor(actor);
      return response;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to create actor");
    }
  }
);

export const fetchActorById = createAsyncThunk(
  "actor/id",
  async (id: number, thunkAPI) => {
    try {
      const response = await actorService.getActorById(id);
      return response;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch actor");
    }
  }
);

export const fetchAllActors = createAsyncThunk(
  "actor/fetchAllActors",
  async (
    { pageNumber, pageSize }: { pageNumber: number; pageSize: number },
    thunkAPI
  ) => {
    try {
      const response = await actorService.getAllActors(pageNumber, pageSize);
      console.log("Burrrp", response);
      return response; // Keep full API response
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch actors");
    }
  }
);

export const updateActor = createAsyncThunk(
  "actor/updateActor",
  async (actor: IActor, thunkAPI) => {
    try {
      const response = await actorService.updateActor(actor.Id, actor);
      return response;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to update actor");
    }
  }
);

export const deleteActor = createAsyncThunk(
  "actor/deleteActor",
  async (id: number, thunkAPI) => {
    try {
      const response = await actorService.deleteActor(id);
      return response;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to delete actor");
    }
  }
);

const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  extraReducers: (builder) => {

    builder.addCase(fetchAllActors.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(fetchAllActors.fulfilled, (state, action) => {
      state.fetchStatus = "succeeded";
      state.fetchActors = action.payload; // Store full API response
    });
    builder.addCase(fetchAllActors.rejected, (state, action) => {
      state.fetchStatus = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(updateActor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateActor.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.actor = action.payload;
    });
    builder.addCase(updateActor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    builder.addCase(createActor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createActor.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.actor = action.payload;
    });
    builder.addCase(createActor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    builder.addCase(deleteActor.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteActor.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.actor = action.payload;
    });

    builder.addCase(deleteActor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    builder.addCase(fetchActorById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchActorById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.actor = action.payload;
    });
    builder.addCase(fetchActorById.rejected, ( state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
    
    
    
  },
});
export const selectActor = (state: { actors: ActorState }) =>
  state.actors.actor;

export default actorSlice.reducer;
