import React from 'react';
import CardTemplate from "./CardTemplate";
import Button from '../basic/Button';
import {IoIosCheckmarkCircleOutline} from 'react-icons/io';
import {SelectiveSubject} from "../../types";

interface SubjectLectureCardEmptyProps {
    viewedSubject: SelectiveSubject | null;
}

function SubjectLectureCardEmpty({viewedSubject}: SubjectLectureCardEmptyProps) {

    return (
        <div className='w-fit pl-8 pt-6'>
            <CardTemplate>
                <div className='pl-10 pb-7 pr-40'>
                    <p className='font-light text-lg text-[#208843] pt-7'>Інформація про предмет відсутня</p>
                    <p className='w-[553px] font-normal text-sm pt-[10px] leading-6'>
                        Але ви можете проголосувати за нього і якщо набереться необхідна
                        кількість слухачів, кафедра розгляне можливість організації ввідної лекції
                    </p>
                    {viewedSubject && viewedSubject?.votes >= 5 ?
                        <div className='flex flex-row gap-2 items-center mt-3'>
                            <div className='text-[#208843]'>
                                <IoIosCheckmarkCircleOutline size={25}/>
                            </div>
                            <p className='text-base font-light'>
                                Необхідна кількість голосів набрана. Чекайте на оновлення інформації
                            </p>
                        </div>
                        :
                        <div className='flex flex-row gap-2 items-center mt-3'>
                            <p className='text-base font-normal'>{`${viewedSubject?.votes}/5 голосів`}</p>
                            <div className='w-20 h-7'>
                                <Button label='Голос' styles='text-sm'/>
                            </div>
                        </div>
                    }
                </div>
            </CardTemplate>
        </div>
    )
}

export default SubjectLectureCardEmpty
