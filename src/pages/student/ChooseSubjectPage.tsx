import React, {useState} from 'react'
import 'tippy.js/dist/tippy.css';
import Sidebar from "../../components/complex/Sidebar";
import SubjectInfoCard from "../../components/complex/SubjectInfoCard";
import SubjectLectureCardFilled from "../../components/complex/SubjectLectureCard-filled";
import {SelectiveSubject} from "../../types";
import SubjectLectureCardEmpty from "../../components/complex/SubjectLectureCard-empty";
import {useAppSelector} from "../../redux/hooks";

function ChooseSubjectPage() {

    const {selectiveSubjects} = useAppSelector(state => state.student)
    const [viewedSubject, setViewedSubject] = useState<SelectiveSubject | null>(selectiveSubjects[0] || null)

    return (
        <div className='flex flex-row w-screen h-[calc(100vh-5rem)]'>
            <Sidebar subjectsList={selectiveSubjects} viewedSelectiveSubjectHandler={setViewedSubject} viewedSelectiveSubject={viewedSubject}/>
            <div className='w-full'>
                <p className='pl-8 text-2xl pt-8'>{viewedSubject?.name}</p>
                <SubjectInfoCard subject={viewedSubject}/>
                {viewedSubject?.introLectureInfo ?
                    <SubjectLectureCardFilled viewedSubject={viewedSubject}/>
                    :
                    <SubjectLectureCardEmpty viewedSubject={viewedSubject}/>
                }
            </div>
        </div>
    )
}

export default ChooseSubjectPage;
