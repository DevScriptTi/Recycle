import { createSlice } from "@reduxjs/toolkit";

const PrimaryMaterCategoriesSlices = createSlice({
    name : "PrimaryMaterCategories",
    initialState : [],
    reducers : {
        setPrimaryMaterCategories : (state, action)=>action.payload
    }
})

export const {setPrimaryMaterCategories} = PrimaryMaterCategoriesSlices.actions ;
export default PrimaryMaterCategoriesSlices.reducer ;