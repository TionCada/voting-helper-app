import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SelectiveSubject, SelectedSubject} from "../../types";

type Student = {
    name: string;
    selectiveSubjects: SelectiveSubject[];
    selectedSubjects: SelectedSubject[];
}

const initialState: Student = {
    name: 'Новак',
    selectiveSubjects: [
        {
            name: 'Front-End',
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
            votes: 5,
            basicInfo: {
                semester: 9,
                ects: 1,
                controlType: 'екзамен',
                department: 'ОТ ТЕФ',
            },
            introLectureInfo: null
        },
    ],
    selectedSubjects: [
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
        }
    ],
}

const studentSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers: {
        addStudent(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        addSelectiveSubjects(state, action: PayloadAction<SelectiveSubject[]>) {
            state.selectiveSubjects = action.payload
        },
        addSelectedSubjects(state, action: PayloadAction<SelectedSubject[]>) {
            state.selectedSubjects = action.payload
        }
    }
})

export default studentSlice.reducer
export const {addStudent, addSelectiveSubjects, addSelectedSubjects} = studentSlice.actions