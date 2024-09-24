import { createSlice } from "@reduxjs/toolkit";


const ProductCategoriesSlices = createSlice({
    name : "ProductCategories",
    initialState : [],
    reducers : {
        setProductCategories : (state, action)=>action.payload
    }
})

export const {setProductCategories} = ProductCategoriesSlices.actions ;
export default ProductCategoriesSlices.reducer ;