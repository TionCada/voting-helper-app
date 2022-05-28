import React from 'react'
import 'tippy.js/dist/tippy.css';
import ChooseSubjectPage from "../pages/student/ChooseSubjectPage";
import Header from "../components/complex/Header";
import AwaitPage from "../pages/student/AwaitPage";
import ResultsPage from "../pages/student/ResultsPage";
import {useAppSelector} from "../redux/hooks";

function StudentAccount() {

    const {stage, authorizedUserData} = useAppSelector(state => state.app)

    console.log(authorizedUserData)

    return (
        <>
            <Header user={authorizedUserData?.name}/>
            {stage === 2 && <ChooseSubjectPage/>}
            {stage === 3 && <AwaitPage/>}
            {stage === 4 && <ResultsPage subjects={authorizedUserData?.subjects}/>}
        </>
    )
}

export default StudentAccount;
