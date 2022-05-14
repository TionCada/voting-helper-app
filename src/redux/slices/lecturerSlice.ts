import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SelectedSubject} from "../../types";

type Lecturer = {
    name: string;
    taughtSubjects: SelectedSubject[];
}

const initialState: Lecturer = {
    name: 'Корнієнко',
    taughtSubjects: [
        {
            name: 'Back-End Програмування',
            lectureInfo: {
                lecturer: 'Корнієнко С.О.',
                messenger: 'Google Classroom',
                link: 'https://ramp.network/'
            },
            practiceInfo: {
                lecturer: 'Васильківський В.П.',
                messenger: 'Telegram',
                link: 'https://ramp.network/'
            }
        },
        {
            name: 'Front-End Програмування',
            lectureInfo: {
                lecturer: 'Бебрус С.О.',
                messenger: 'Classroom',
                link: 'https://ramp.network/'
            },
            practiceInfo: {
                lecturer: 'Монатік В.П.',
                messenger: 'Asus',
                link: 'https://ramp.network/'
            }
        }
    ],
}

const lecturerSlice = createSlice({
    name: 'lecturer',
    initialState: initialState,
    reducers: {
        addLecturer(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        addTaughtSubjects(state, action: PayloadAction<SelectedSubject[]>) {
            state.taughtSubjects = action.payload
        },
    }
})

export default lecturerSlice.reducer
export const {addLecturer, addTaughtSubjects} = lecturerSlice.actions