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
import {
    SubjectIntroLectureInfoFormData,
    SubjectStudyingInfoFormData
} from "../../components/complex/ChosenSubjectCard-edited";
import {votesDataObject} from "../../components/complex/SubjectLectureCard-empty";

export type UserData = {
    id: string;
    name: string;
    role: UserRole;
    subjects: Subject[];
    hasUserVoted: boolean;
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

export const updateSubjectStudyingInfo = createAsyncThunk<SubjectStudyingInfoFormData, SubjectStudyingInfoFormData, { rejectValue: string }>(
    'app/updateSubjectStudyingInfo',
    async (data, {rejectWithValue}) => {
        try {
            const subjectRef = doc(db, "subjects", data.subjectId!);
            const dataObjCopy: SubjectStudyingInfoFormData = JSON.parse(JSON.stringify(data))
            delete dataObjCopy.subjectId
            await updateDoc(subjectRef, {studyingInfo: dataObjCopy});
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const updateSubjectIntroLectureInfo = createAsyncThunk<SubjectIntroLectureInfoFormData, SubjectIntroLectureInfoFormData, { rejectValue: string }>(
    'app/updateSubjectIntroLectureInfo',
    async (data, {rejectWithValue}) => {
        try {
            const subjectRef = doc(db, "subjects", data.subjectId!);
            const dataObjCopy: SubjectStudyingInfoFormData = JSON.parse(JSON.stringify(data))
            delete dataObjCopy.subjectId
            await updateDoc(subjectRef, dataObjCopy as any);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

export const handleSubjectsVotes = createAsyncThunk<votesDataObject, votesDataObject, { rejectValue: string }>(
    'app/handleSubjectsVotes',
    async (votesData, {rejectWithValue}) => {
        try {
            const subjectRef = doc(db, "subjects", votesData.subjectId!);
            const userRef = doc(db, "users", votesData.userId!);
            await updateDoc(subjectRef, {votes: votesData.votes});
            await updateDoc(userRef, {hasUserVoted: true});
            if (votesData.votes === 5) {
                const adminRef = doc(db, "users", "admin");
                const adminResponse = await getDoc(adminRef);
                const adminData = adminResponse.data() as UserData
                await updateDoc(adminRef, {
                    subjects: [
                        ...adminData.subjects,
                        votesData.subjectId
                    ]
                })
            }
            return votesData;
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
                    id: userData.id,
                    name: userData.name,
                    role: userData.role,
                    subjects: userData.subjects,
                    hasUserVoted: userData.hasUserVoted
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
        enableDataLoading: (state) => {
            state.isDataLoading = true
        },
        disableDataLoading: (state) => {
            state.isDataLoading = false
        },
        clearAuthorizedUserData: (state) => {
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

            // Update Subject Studying Info
            .addCase(updateSubjectStudyingInfo.pending, (state) => {
                state.isDataLoading = true
            })
            .addCase(updateSubjectStudyingInfo.fulfilled, (state, action) => {
                if (state.authorizedUserData !== null) {
                    const payloadObjCopy: SubjectStudyingInfoFormData = JSON.parse(JSON.stringify(action.payload))
                    delete payloadObjCopy.subjectId
                    const editedSubjectIndex = state.authorizedUserData.subjects.findIndex(
                        (subject) => subject.id === action.payload.subjectId
                    )
                    state.authorizedUserData.subjects[editedSubjectIndex].studyingInfo = payloadObjCopy
                    state.isDataLoading = false
                    toast.success('Інформацію збережено')
                }
            })
            .addCase(updateSubjectStudyingInfo.rejected, (state, action) => {
                console.log(action.payload)
                toast.error('Помилка при збереженні інформації')
                state.isDataLoading = false
            })

            // Update Subject Intro Lecture Info
            .addCase(updateSubjectIntroLectureInfo.pending, (state) => {
                state.isDataLoading = true
            })
            .addCase(updateSubjectIntroLectureInfo.fulfilled, (state, action) => {
                if (state.authorizedUserData !== null) {
                    const payloadObjCopy: SubjectIntroLectureInfoFormData = JSON.parse(JSON.stringify(action.payload))
                    delete payloadObjCopy.subjectId
                    const editedSubjectIndex = state.authorizedUserData.subjects.findIndex(
                        (subject) => subject.id === action.payload.subjectId
                    )
                    console.log('payloadObjCopy', {...payloadObjCopy.introLectureInfo})
                    state.authorizedUserData.subjects[editedSubjectIndex].introLectureInfo = {...payloadObjCopy.introLectureInfo} as any
                    state.isDataLoading = false
                    toast.success('Інформацію збережено')
                }
            })
            .addCase(updateSubjectIntroLectureInfo.rejected, (state, action) => {
                console.log(action.payload)
                toast.error('Помилка при збереженні інформації')
                state.isDataLoading = false
            })

            // Handle Subjects Votes
            .addCase(handleSubjectsVotes.pending, (state) => {
                state.isDataLoading = true
            })
            .addCase(handleSubjectsVotes.fulfilled, (state, action) => {
                if (state.authorizedUserData !== null) {
                    const payloadObjCopy: votesDataObject = JSON.parse(JSON.stringify(action.payload))
                    delete payloadObjCopy.subjectId
                    const votedSubjectIndex = state.authorizedUserData.subjects.findIndex(
                        (subject) => subject.id === action.payload.subjectId
                    )
                    state.authorizedUserData.hasUserVoted = true
                    state.authorizedUserData.subjects[votedSubjectIndex].votes = payloadObjCopy.votes
                    toast.success('Голос зараховано')
                    state.isDataLoading = false
                }
            })
            .addCase(handleSubjectsVotes.rejected, (state, action) => {
                console.log(action.payload)
                toast.error('Помилка при голосуванні')
                state.isDataLoading = false
            })
    }
})

export default appSlice.reducer
export const {enableDataLoading, disableDataLoading, clearAuthorizedUserData} = appSlice.actions