import {combineReducers, configureStore} from '@reduxjs/toolkit';
import studentSlice from "./slices/studentSlice";
import lecturerSlice from "./slices/lecturerSlice";
import adminSlice from "./slices/adminSlice";
import appSlice from "./slices/appSlice";

const rootReducer = combineReducers({
    student: studentSlice,
    lecturer: lecturerSlice,
    admin: adminSlice,
    app: appSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;