import { createSlice } from "@reduxjs/toolkit";

const NotificationsSlice = createSlice({
    name : "Notifications",
    initialState : [],
    reducers : {
        setNotifications : (state, action)=> action.payload,
        addNotification : (state, action)=> {state.push(action.payload)}
    }
})

export const {setNotifications, addNotification} = NotificationsSlice.actions ;
export default NotificationsSlice.reducer ;