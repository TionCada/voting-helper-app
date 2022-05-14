import React from 'react'
import 'tippy.js/dist/tippy.css';
import CardTemplate from "./CardTemplate";
import Button from "../basic/Button";
import {SelectedSubject} from "../../types";

type ChosenSubjectCardFilledProps = {
    subject: SelectedSubject;
}

function ChosenSubjectCardFilled({subject}: ChosenSubjectCardFilledProps) {

    return (
        <div className='w-fit'>
            <CardTemplate>
                <div className='px-10'>
                    <p className='text-xl font-light pt-6'>{`${subject?.name}`}</p>
                    <div className='flex flex-row gap-14 pt-4 pb-6'>
                        <div className='flex flex-col gap-2.5'>
                            <p className='text-lg font-light text-[#208843]'>Інформація про лекції</p>
                            <p className='text-sm'>{`Викладач: ${subject?.lectureInfo?.lecturer}`}</p>
                            <p className='text-sm'>{`Мессенджер: ${subject?.lectureInfo?.messenger}`}</p>
                            <div className='flex flex-row gap-2 -mt-1 items-center'>
                                <p className='text-sm'>Посилання на чат: </p>
                                <Button label='Перейти' styles='text-sm w-20 h-7'
                                        onClick={() => window.open(`${subject?.lectureInfo?.link}`, "_blank")}/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2.5'>
                            <p className='text-lg font-light text-[#208843]'>Інформація про практичні</p>
                            <p className='text-sm'>{`Викладач: ${subject?.practiceInfo?.lecturer}`}</p>
                            <p className='text-sm'>{`Мессенджер: ${subject?.practiceInfo?.messenger}`}</p>
                            <div className='flex flex-row gap-2 -mt-1 items-center'>
                                <p className='text-sm'>Посилання на чат: </p>
                                <Button label='Перейти' styles='text-sm w-20 h-7'
                                        onClick={() => window.open(`${subject?.practiceInfo?.link}`, "_blank")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </CardTemplate>
        </div>
    )
}

export default ChosenSubjectCardFilled;
