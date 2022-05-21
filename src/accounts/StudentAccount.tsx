import React, {useEffect} from 'react'
import 'tippy.js/dist/tippy.css';
import ChooseSubjectPage from "../pages/student/ChooseSubjectPage";
import Header from "../components/complex/Header";
import AwaitPage from "../pages/student/AwaitPage";
import ResultsPage from "../pages/student/ResultsPage";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getAppStage} from "../redux/slices/appSlice";

function StudentAccount() {

    const dispatch = useAppDispatch();
    const {stage, authorizedUserData} = useAppSelector(state => state.app)

    useEffect(() => {
        dispatch(getAppStage())
    }, [])

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
