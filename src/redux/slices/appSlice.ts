import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AppStage, Subject, UserRole} from "../../types";
import {doc, updateDoc, getDoc} from "firebase/firestore";
import {toast} from 'react-toastify';
import db from "../../db";
import {
    query,
    collection,
    where,
    documentId,
    getDocs
} from "firebase/firestore";

export type UserData = {
    login: string;
    name: string;
    role: UserRole;
    subjects: Subject[];
}

interface GeneralData {
    stage: AppStage;
    authorizedUserData: UserData | null;
}

interface App extends GeneralData {
    isDataLoading: boolean;
    isErrorOccurred: boolean;
}

const initialState: App = {
    stage: 1,
    authorizedUserData: null,
    isDataLoading: false,
    isErrorOccurred: false,
}

export const updateAppStage = createAsyncThunk<AppStage, AppStage, { rejectValue: string }>(
    'app/updateAppStage',
    async (appStage, {rejectWithValue}) => {
        try {
            const appRef = doc(db, "app", "info");
            await updateDoc(appRef, {stage: appStage});
            return appStage
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const getGeneralData = createAsyncThunk<GeneralData, string, { rejectValue: string }>(
    'app/getGeneralData',
    async (userId, {rejectWithValue}) => {
        try {
            const appRef = doc(db, "app", "info");
            const userRef = doc(db, "users", userId);

            const appResponse = await getDoc(appRef);
            const userResponse = await getDoc(userRef);

            const appData = appResponse.data() as GeneralData
            const userData = userResponse.data() as UserData

            if (userData.subjects.length > 0) {
                const q = query(collection(db, "subjects"), where(documentId(), "in", userData.subjects));

                const subjectsDocsSnap = await getDocs(q);
                let index = 0;

                subjectsDocsSnap.forEach((doc) => {
                    userData.subjects[index] = doc.data() as Subject
                    index++
                });
            }

            return {
                stage: appData.stage,
                authorizedUserData: {
                    login: userData.login,
                    name: userData.name,
                    role: userData.role,
                    subjects: userData.subjects
                }
            }
        } catch (err: any) {
            console.log(err)
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
        },
        clearAuthorizedUserData(state) {
            state.authorizedUserData = null
        }
    },
    extraReducers: (builder) => {
        builder
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

            // Get General Data
            .addCase(getGeneralData.pending, (state) => {
                state.isDataLoading = true
            })
            .addCase(getGeneralData.fulfilled, (state, action) => {
                state.stage = action.payload.stage
                state.authorizedUserData = action.payload.authorizedUserData
                state.isDataLoading = false
            })
            .addCase(getGeneralData.rejected, (state, action) => {
                console.log(action.payload)
                state.isDataLoading = false
                state.isErrorOccurred = true
            })
    }
})

export default appSlice.reducer
export const {enableDataLoading, disableDataLoading, clearAuthorizedUserData} = appSlice.actions