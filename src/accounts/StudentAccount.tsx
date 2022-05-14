import React from 'react'
import 'tippy.js/dist/tippy.css';
import {AppStage} from '../types'
import ChooseSubjectPage from "../pages/student/ChooseSubjectPage";
import Header from "../components/complex/Header";
import AwaitPage from "../pages/student/AwaitPage";
import ResultsPage from "../pages/student/ResultsPage";
import {useAppSelector} from "../redux/hooks";

interface StudentAccountProps {
    appStage: AppStage;
}
function StudentAccount({appStage}: StudentAccountProps) {

    const { name, selectedSubjects } = useAppSelector(state => state.student)

    return (
        <>
            <Header user={name}/>
            {appStage === 2 && <ChooseSubjectPage/>}
            {appStage === 3 && <AwaitPage/>}
            {appStage === 4 && <ResultsPage selectedSubjects={selectedSubjects}/>}
        </>
    )
}

export default StudentAccount;
