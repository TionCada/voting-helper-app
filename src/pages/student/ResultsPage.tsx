import React from 'react'
import 'tippy.js/dist/tippy.css';
import ChosenSubjectCardFilled from "../../components/complex/ChosenSubjectCard-filled";
import ChosenSubjectCardEmpty from "../../components/complex/ChosenSubjectCard-empty";
import {Subject} from "../../types";

interface StatusPageProps {
    subjects: Subject[] | undefined;
}

function ResultsPage({subjects}: StatusPageProps) {

    return (
        <div className='flex flex-col items-center gap-7 h-[calc(100vh-5rem)] pb-7 overflow-x-hidden'>
            <p className='text-xl font-normal pt-12'>Вітаємо! Ви вивчатимите наступні дисципліни:</p>
            {subjects?.map((subject) => <>
                {subject?.studyingInfo ?
                        <ChosenSubjectCardFilled subject={subject}/>
                        :
                        <ChosenSubjectCardEmpty subject={subject}/>}
                </>
            )}
        </div>
    )
}

export default ResultsPage;
