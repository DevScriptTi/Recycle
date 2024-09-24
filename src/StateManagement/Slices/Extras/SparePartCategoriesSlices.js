import { createSlice } from "@reduxjs/toolkit";

const SparePartCategoriesSlices = createSlice({
    name : "SparePartCategories",
    initialState : [],
    reducers : {
        setSparePartCategories : (state, action)=>action.payload
    }
})

export const {setSparePartCategories} = SparePartCategoriesSlices.actions ;
export default SparePartCategoriesSlices.reducer ;