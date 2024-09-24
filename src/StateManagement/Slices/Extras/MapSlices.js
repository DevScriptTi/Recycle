import { createSlice } from "@reduxjs/toolkit";

const MapSlices = createSlice({
    name : "Notifications",
    initialState : {
        'currentLocation' : [36.0,7.0]
    },
    reducers : {
        setCurrentLocation : (state, action)=> {state.currentLocation = action.payload},
    }
})

export const {setCurrentLocation} = MapSlices.actions ;
export default MapSlices.reducer ;