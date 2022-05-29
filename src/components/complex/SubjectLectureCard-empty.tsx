import React, {useState} from 'react';
import CardTemplate from "./CardTemplate";
import Button from '../basic/Button';
import {IoIosCheckmarkCircleOutline} from 'react-icons/io';
import {Subject} from "../../types";
import {handleSubjectsVotes} from "../../redux/slices/appSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

interface SubjectLectureCardEmptyProps {
    viewedSubject: Subject | null;
}

export interface votesDataObject {
    userId: string;
    subjectId?: string;
    votes: number;
}

function SubjectLectureCardEmpty({viewedSubject}: SubjectLectureCardEmptyProps) {

    const dispatch = useAppDispatch();
    const {isDataLoading, authorizedUserData} = useAppSelector(state => state.app)

    return (
        <div className='w-fit pl-8 pt-6'>
            <CardTemplate>
                <div className='pl-10 pb-7 pr-40'>
                    <p className='font-light text-lg text-[#208843] pt-7'>
                        Інформація про предмет відсутня
                    </p>
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
                                <Button isDisabled={authorizedUserData?.hasUserVoted} isLoading={isDataLoading} label='Голос' styles='text-sm' onClick={() => dispatch(handleSubjectsVotes({
                                    userId: authorizedUserData?.id!,
                                    subjectId: viewedSubject?.id!,
                                    votes: viewedSubject?.votes! + 1
                                }))}/>
                            </div>
                        </div>
                    }
                </div>
            </CardTemplate>
        </div>
    )
}

export default SubjectLectureCardEmpty
