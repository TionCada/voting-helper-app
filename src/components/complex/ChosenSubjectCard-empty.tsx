import React from 'react'
import 'tippy.js/dist/tippy.css';
import CardTemplate from "./CardTemplate";
import {SelectedSubject} from "../../types";

type ChosenSubjectCardEmptyProps = {
    subject: SelectedSubject;
}

function ChosenSubjectCardEmpty({subject}: ChosenSubjectCardEmptyProps) {

    return (
        <div className='w-fit'>
            <CardTemplate>
                <div className='flex flex-col gap-2 px-10 py-6'>
                    <p className='text-xl font-light'>{subject?.name}</p>
                    <p className='text-lg pt-2 text-[#208843] font-light'>Викладач не додав інформацію про предмет</p>
                    <p className='text-sm font-normal'>Ви можете звернутись на кафедру щодо координації навчання з цієї дисципліни</p>
                </div>
            </CardTemplate>
        </div>
    )
}

export default ChosenSubjectCardEmpty;
