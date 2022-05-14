import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SelectiveSubject} from "../../types";

type Admin = {
    name: string;
    pendingSubjects: SelectiveSubject[];
}

const initialState: Admin = {
    name: 'Адміністратор',
    pendingSubjects: [
        {
            name: 'Front-End Програмування',
            votes: 0,
            basicInfo: {
                semester: 3,
                ects: 6,
                controlType: 'залік',
                department: 'ОТ ФІОТ',
            },
            introLectureInfo: {
                description: 'Довгий опис',
                lecturer: 'Жереб',
                date: 1652296899478,
                platform: 'Zoom',
                link: 'https://www.youtube.com/watch?v=uRlh6-tHWEE',
            }
        },
        {
            name: 'Back-End',
            votes: 0,
            basicInfo: {
                semester: 3,
                ects: 6,
                controlType: 'залік',
                department: 'ОТ ФІОТ',
            },
            introLectureInfo: {
                description: 'Короткий опис',
                lecturer: 'Яланецький',
                date: 1652389467980,
                platform: 'Google meet',
                link: 'https://www.youtube.com/watch?v=uRlh6-tHWEE',
            }
        },
    ],
}

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        addAdmin(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        addPendingSubjects(state, action: PayloadAction<SelectiveSubject[]>) {
            state.pendingSubjects = action.payload
        },
    }
})

export default adminSlice.reducer
export const {addAdmin, addPendingSubjects} = adminSlice.actions