import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "claim",
  initialState: {
    claims: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getClaimStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getClaimSuccess: (state, action) => {
      state.isFetching = false;
      state.claims = action.payload;
    },
    getClaimFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteClaimStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteClaimSuccess: (state, action) => {
      state.isFetching = false;
      state.claims.splice(
        state.claims.findIndex((claim) => claim._id === action.payload),
        1
      );
    },
    deleteClaimFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateClaimStart: (state) => {
      state.isFetching = true;
      state.error = false;
      console.log(state)
    },
    updateClaimSuccess: (state, action) => {
      console.log(state.claims);
      state.isFetching = false;
      console.log(state.claims[
        state.claims.findIndex((claim) => claim._id === action.payload.id)
      ])
      state.claims[
        state.claims.findIndex((claim) => claim._id === action.payload.id)
      ] = action.payload.updatedclaim;
    },
    updateClaimFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addClaimStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addClaimSuccess: (state, action) => {
      state.isFetching = false;
      state.claims.push(action.payload);
    },
    addClaimFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getClaimStart,
  getClaimSuccess,
  getClaimFailure,
  deleteClaimStart,
  deleteClaimSuccess,
  deleteClaimFailure,
  updateClaimStart,
  updateClaimSuccess,
  updateClaimFailure,
  addClaimStart,
  addClaimSuccess,
  addClaimFailure,
} = productSlice.actions;

export default productSlice.reducer;