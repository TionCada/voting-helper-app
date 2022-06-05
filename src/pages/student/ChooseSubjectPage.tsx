import React, {useEffect, useState} from 'react'
import 'tippy.js/dist/tippy.css';
import Sidebar from "../../components/complex/Sidebar";
import SubjectInfoCard from "../../components/complex/SubjectInfoCard";
import SubjectLectureCardFilled from "../../components/complex/SubjectLectureCard-filled";
import {Subject} from "../../types";
import SubjectLectureCardEmpty from "../../components/complex/SubjectLectureCard-empty";
import {useAppSelector} from "../../redux/hooks";

function ChooseSubjectPage() {

    console.log('here')

    const {authorizedUserData} = useAppSelector(state => state.app)
    const [viewedSubject, setViewedSubject] = useState<Subject | null>(authorizedUserData?.subjects[0] || null)

    useEffect(() => {
        (authorizedUserData && viewedSubject)
        && setViewedSubject(authorizedUserData.subjects[parseFloat(viewedSubject.id) - 1])
    }, [authorizedUserData])

    return (
        <div className='flex flex-row w-screen h-[calc(100vh-5rem)]'>
            <Sidebar subjectsList={authorizedUserData?.subjects}
                     viewedSubjectHandler={setViewedSubject}
                     viewedSubject={viewedSubject}/>
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
