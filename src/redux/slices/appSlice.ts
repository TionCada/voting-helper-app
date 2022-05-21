import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AppStage, Subject, UserRole} from "../../types";
import {doc, updateDoc, getDoc} from "firebase/firestore";
import {toast} from 'react-toastify';
import db from "../../db";

type UserCredentials = {
    email: string;
    password: string
}

export interface UserData {
    id: string;
    name: string;
    role: UserRole;
    subjects: Subject[];
}

type App = {
    stage: AppStage;
    authorizedUserData: UserData | null;
    isDataLoading: boolean;
    isErrorOccurred: boolean;
}

const initialState: App = {
    stage: 1,
    authorizedUserData: null,
    isDataLoading: false,
    isErrorOccurred: false,
}

export const getAppStage = createAsyncThunk<AppStage, undefined, { rejectValue: string }>(
    'app/getAppStage',
    async (_, {rejectWithValue}) => {
        try {
            const appRef = doc(db, "app", "info");
            const response = await getDoc(appRef);
            const appData: App = response.data() as App
            return appData.stage
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const updateAppStage = createAsyncThunk<AppStage, AppStage, { rejectValue: string }>(
    'app/updateAppStage',
    async (appStage, {rejectWithValue}) => {
        try {
            const appRef = doc(db, "app", "info");
            await updateDoc(appRef, {stage: appStage});
            return appStage as AppStage
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        enableDataLoading(state) {
            state.isDataLoading = true
        },
        disableDataLoading(state) {
            state.isDataLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            // Get App Stage
            .addCase(getAppStage.pending, (state) => {
                state.isDataLoading = true
            })
            .addCase(getAppStage.fulfilled, (state, action) => {
                state.stage = action.payload
                state.isDataLoading = false
            })
            .addCase(getAppStage.rejected, (state, action) => {
                console.log(action.payload)
                state.isDataLoading = false
                state.isErrorOccurred = true
            })

            // Update App Stage
            .addCase(updateAppStage.pending, (state) => {
                state.isDataLoading = true
            })
            .addCase(updateAppStage.fulfilled, (state, action) => {
                state.stage = action.payload
                toast.success('Перехід успішний')
                state.isDataLoading = false
            })
            .addCase(updateAppStage.rejected, (state, action) => {
                console.log(action.payload)
                toast.error('Помилка при переході')
                state.isDataLoading = false
            })
    }
})

export default appSlice.reducer
export const {enableDataLoading, disableDataLoading} = appSlice.actions