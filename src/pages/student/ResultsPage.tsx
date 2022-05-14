import React from 'react'
import 'tippy.js/dist/tippy.css';
import ChosenSubjectCardFilled from "../../components/complex/ChosenSubjectCard-filled";
import ChosenSubjectCardEmpty from "../../components/complex/ChosenSubjectCard-empty";
import {SelectedSubject} from "../../types";

interface StatusPageProps {
    selectedSubjects: SelectedSubject[];
}

function ResultsPage({selectedSubjects}: StatusPageProps) {

    return (
        <div className='flex flex-col items-center gap-7 h-[calc(100vh-5rem)] pb-7 overflow-x-hidden'>
            <p className='text-xl font-normal pt-12'>Вітаємо! Ви вивчатимите наступні дисципліни:</p>
            {selectedSubjects.map((subject) => <>
                    {subject?.lectureInfo && subject?.practiceInfo ? <ChosenSubjectCardFilled subject={subject}/> : <ChosenSubjectCardEmpty subject={subject}/>}
                </>
            )}
        </div>
    )
}

export default ResultsPage;
