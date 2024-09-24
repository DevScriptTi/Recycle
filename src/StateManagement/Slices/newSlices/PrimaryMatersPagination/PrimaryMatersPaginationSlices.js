import { createSlice } from "@reduxjs/toolkit";

const PrimaryMatersPaginationSlices = createSlice({
  name: "PrimaryMatersPagination",
  initialState: {
    data: [],
    links: [],
    first_page_url: null,
    from: null,
    last_page: null,
    last_page_url: null,
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  },
  reducers: {
    setPrimaryMatersPagination: (state, action) => {
      state.data = action.payload.data.data;
      state.links = action.payload.data.links;
      state.first_page_url = action.payload.data.first_page_url;
      state.from = action.payload.data.from;
      state.last_page = action.payload.data.last_page;
      state.last_page_url = action.payload.data.last_page_url;
      state.per_page = action.payload.data.per_page;
      state.prev_page_url = action.payload.data.prev_page_url;
      state.to = action.payload.data.to;
      state.total = action.payload.data.total;
    },
    addPrimaryMatersPagination: (state, action) => {
      state.data.push(action.payload);
    },
    deletePrimaryMatersPagination: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updatePrimaryMatersPagination: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const {setPrimaryMatersPagination,addPrimaryMatersPagination,deletePrimaryMatersPagination,updatePrimaryMatersPagination} = PrimaryMatersPaginationSlices.actions;
export default PrimaryMatersPaginationSlices.reducer;
