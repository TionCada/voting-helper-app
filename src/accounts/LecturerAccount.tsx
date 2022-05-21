import React, {useEffect, useState} from 'react'
import 'tippy.js/dist/tippy.css';
import Header from "../components/complex/Header";
import Sidebar from "../components/complex/Sidebar";
import ChosenSubjectCardEdited from "../components/complex/ChosenSubjectCard-edited";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {Subject} from "../types";
import {getAppStage} from "../redux/slices/appSlice";

function LecturerAccount() {

    const dispatch = useAppDispatch();
    const {authorizedUserData} = useAppSelector(state => state.app)
    const [viewedSubject, setViewedSubject] = useState<Subject | null>(authorizedUserData?.subjects[0] || null)

    useEffect(() => {
        dispatch(getAppStage())
    }, [])

    return (
        <>
            <Header user={authorizedUserData?.name}/>
            <div className='flex flex-row w-screen h-[calc(100vh-5rem)]'>
                <Sidebar subjectsList={authorizedUserData?.subjects}
                         viewedSubjectHandler={setViewedSubject}
                         viewedSubject={viewedSubject}/>
                <div className='w-full'>
                    <p className='pl-8 text-2xl pt-8'>{viewedSubject?.name}</p>
                    <ChosenSubjectCardEdited subject={viewedSubject}/>
                </div>
            </div>
        </>
    )
}

export default LecturerAccount;
