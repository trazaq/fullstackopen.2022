import {configureStore, createSlice} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'


const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        notify(state, action) {
            return state = action.payload;
        },
        un_notify(state, action) {
            return state = null;
        },
    }
})

const store = configureStore({
    reducer: {
        notification: notificationSlice.reducer,
    }
})


store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})

export const { notify, un_notify } = notificationSlice.actions;

export const { notifyReducer } = notificationSlice.reducer;

export default store