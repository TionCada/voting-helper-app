import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AppStage, UserRole} from "../../types";
import {doc, updateDoc, getDoc} from "firebase/firestore";
import db from "../../db";
import {toast} from 'react-toastify';

type App = {
    stage: AppStage;
    authorizedUserId: string;
    userRole: UserRole;
    isDataLoading: boolean;
    error: boolean;
}

const initialState: App = {
    stage: 1,
    authorizedUserId: 'admin',
    userRole: 'admin',
    isDataLoading: true,
    error: false,
}

export const updateAppStage = createAsyncThunk<AppStage, AppStage, { rejectValue: string }>(
    'app/updateAppStage',
    async (appStage: AppStage, {rejectWithValue}) => {
        try {
            const appRef = doc(db, "app", "info");
            await updateDoc(appRef, {stage: appStage});
            return appStage as AppStage
        } catch (err: any) {
            return rejectWithValue(err.message)
        }

    }
)

export const fetchAppStage = createAsyncThunk<AppStage, undefined, { rejectValue: string }>(
    'app/fetchAppStage',
    async (_, {rejectWithValue}) => {
        try {
            const appRef = doc(db, "app", "info");
            const response = await getDoc(appRef);
            const appInfo: App = response.data() as App
            return appInfo ? appInfo.stage : 1
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateAppStage.pending, (state) => {
                    state.isDataLoading = true
                }
            )
            .addCase(updateAppStage.fulfilled, (state, action) => {
                    state.stage = action.payload
                    toast.success('Перехід на насутпний етап успішний')
                    state.isDataLoading = false
                }
            )
            .addCase(updateAppStage.rejected, (state, action) => {
                    console.log(action.payload)
                    toast.error('Помилка при переході на насутпний етап')
                    state.isDataLoading = false
                }
            )

            .addCase(fetchAppStage.pending, (state) => {
                    state.isDataLoading = true
                }
            )
            .addCase(fetchAppStage.fulfilled, (state, action) => {
                    state.stage = action.payload
                    state.isDataLoading = false
                }
            )
            .addCase(fetchAppStage.rejected, (state, action) => {
                    console.log(action.payload)
                    state.error = true
                    state.isDataLoading = false
                }
            )
    }
})

export default appSlice.reducer
export const {enableDataLoading} = appSlice.actions