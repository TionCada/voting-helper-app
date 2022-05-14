import React, {useState} from 'react'
import 'tippy.js/dist/tippy.css';
import Header from "../components/complex/Header";
import Sidebar from "../components/complex/Sidebar";
import ChosenSubjectCardEdited from "../components/complex/ChosenSubjectCard-edited";
import {useAppSelector} from "../redux/hooks";
import {SelectedSubject} from "../types";

function LecturerAccount() {

    const {taughtSubjects} = useAppSelector(state => state.lecturer)
    const [viewedSubject, setViewedSubject] = useState<SelectedSubject | null>(taughtSubjects[0] || null)
    const { name } = useAppSelector(state => state.lecturer)

    return (
        <>
            <Header user={name}/>
            <div className='flex flex-row w-screen h-[calc(100vh-5rem)]'>
                <Sidebar subjectsList={taughtSubjects} viewedSelectedSubjectHandler={setViewedSubject} viewedSelectedSubject={viewedSubject}/>
                <div className='w-full'>
                    <p className='pl-8 text-2xl pt-8'>{viewedSubject?.name}</p>
                    <ChosenSubjectCardEdited subject={viewedSubject}/>
                </div>
            </div>
        </>
    )
}

export default LecturerAccount;
