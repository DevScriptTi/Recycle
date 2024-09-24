import { createSlice } from "@reduxjs/toolkit";

const VendorsSlices = createSlice({
  name: "VendorsSlices",
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
    setVendors: (state, action) => {
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
    addVendor: (state, action) => {
      state.data.push(action.payload);
    },
    deleteVendor: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updateVendor: (state, action) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const {setVendors,addVendor,deleteVendor,updateVendor} = VendorsSlices.actions;
export default VendorsSlices.reducer;
