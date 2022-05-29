import React from 'react'
import 'tippy.js/dist/tippy.css';
import Papa, {ParseResult} from "papaparse";
import {UserRole} from "../../types";
import {ProcessedSubjectData, ProcessedUserData} from "../../utils";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

const storageRef = ref(storage, 'csv-files/csv');

interface FileInputProps {
    validationProps: any;
    dataType: 'users' | 'subjects';
    subjectsHandler?: (subjects: ProcessedSubjectData[]) => void;
    usersHandler?: (subjects: ProcessedUserData[]) => void;
    styles?: string;
}

interface RawSubjectData {
    id: string,
    name: string,
    votes: number,
    controlType: string,
    department: string,
    ects: number,
    semester: number
}

interface RawUserData {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    subjects: string;
}

function FileInput({validationProps, dataType, subjectsHandler, usersHandler, styles}: FileInputProps) {

    const parseFile = (file: File | null, dataType: 'users' | 'subjects') => {
        file && Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            worker: true,
            complete: (response: ParseResult<RawUserData | RawSubjectData>) => {
                dataType == 'users' && userParserFunc(response as ParseResult<RawUserData>)
                dataType === 'subjects' && subjectsParserFunc(response as ParseResult<RawSubjectData>)
            }
        })
    }

    const subjectsParserFunc = (response: ParseResult<RawSubjectData>) => {
        const parsedSubjects = response.data.map(
            (item) => ({
                id: item.id.slice(0, -1),
                name: item.name,
                votes: item.votes,
                basicInfo: {
                    controlType: item.controlType,
                    department: item.department,
                    ects: item.ects,
                    semester: item.semester
                },
                studyingInfo: null,
                introLectureInfo: null
            })
        )
        console.log('subjects', parsedSubjects)
        subjectsHandler && subjectsHandler(parsedSubjects as unknown as ProcessedSubjectData[])
    }

    const userParserFunc = (response: ParseResult<RawUserData>): any => {
        const parsedUsers = response.data.map(
            (item) => ({
                ...item,
                subjects: item.subjects
                    .slice(0, -1)
                    .split(';')
            })
        )
        console.log('users', parsedUsers)
        usersHandler && usersHandler(parsedUsers as unknown as ProcessedUserData[])
    }

    
    
    return (
        <input type='file' accept='.csv' {...validationProps}
               className={`file:border-r-[1px] file:border-r-[#DFDFDF] file:border-solid file:border-l-0 file:border-t-0
               file:border-b-0 file:font-medium font-normal file:bg-[#F0A433] file:py-2 w-60 file:mr-3 file:text-white 
               text-[#6C757D] file:px-4 file:text-sm text-sm file:cursor-pointer border border-[#DFDFDF] ${styles}`}
               onChange={(e) => { 
                   parseFile(e.target.files && e.target.files[0], dataType);
                   if (e.target.files && e.target.files[0]) {
                       uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
                        console.log('Uploaded a blob or file!');
                      });
                   }
                 }  }
        />
        
    )
}

export default FileInput;