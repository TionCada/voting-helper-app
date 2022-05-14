import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppStage, UserRole} from "../../types";

type App = {
    stage: AppStage;
    isUserAuthorized: boolean;
    userRole: UserRole;
}

const initialState: App = {
    stage: 2,
    isUserAuthorized: true,
    userRole: 'student',
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        updateAppStage(state, action: PayloadAction<AppStage>) {
            state.stage = action.payload
        },
        updateAuthInfo(state, action: PayloadAction<boolean>) {
            state.isUserAuthorized = action.payload
        },
        updateUserRole(state, action: PayloadAction<UserRole>) {
            state.userRole = action.payload
        },
    }
})

export default appSlice.reducer
export const {updateAppStage, updateAuthInfo} = appSlice.actions