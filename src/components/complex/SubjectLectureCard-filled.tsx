import React from 'react';
import CardTemplate from "./CardTemplate";
import Button from "../basic/Button";
import {AiOutlineInfoCircle} from 'react-icons/ai'
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import {Subject} from "../../types";
import moment from 'moment';

type SubjectLectureCardFilledProps = {
    viewedSubject: Subject | null;
}

function SubjectLectureCardFilled({viewedSubject}: SubjectLectureCardFilledProps) {

    return (
        <div className='w-fit pl-8 pt-6'>
            <CardTemplate>
                <div className='flex flex-row gap-16 pl-10 pr-10 pb-7'>
                    <div className='w-fit'>
                        <div className='flex flex-row items-end'>
                            <p className='font-light text-lg text-[#208843] pt-7'>Ввідна лекція</p>
                            <Tippy content='Ви можете прослухати ввідну лекцію, щоб детальніше
                               ознайомитись з вибірковою дисципліною та спростити кінцевий вибір'>
                                <div className='h-4 mb-[6px] ml-1 hover:cursor-pointer'>
                                    <AiOutlineInfoCircle size={17}/>
                                </div>
                            </Tippy>
                        </div>
                        <div className='flex flex-col gap-4 pt-3 font-normal text-sm'>
                            <p>{`Викладач: ${viewedSubject?.introLectureInfo?.lecturer}`}</p>
                            <p>
                                {`Дата: ${moment(viewedSubject?.introLectureInfo?.date).local().format('DD.MM.YYYY HH:mm')}`}
                            </p>
                            <p>{`Платформа: ${viewedSubject?.introLectureInfo?.platform}`}</p>
                            <div className='flex flex-row items-center gap-1.5 -mt-1'>
                                <p>Посилання:</p>
                                <div className='w-20 h-7'>
                                    <Button label='Перейти' styles='text-sm font-light'
                                            onClick={() => window.open(
                                                `${viewedSubject?.introLectureInfo?.link}`,
                                                "_blank")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[434px]'>
                        <p className='font-light text-lg text-[#208843] pt-7'>Короткий зміст</p>
                        <p className='font-normal text-sm pt-[10px] leading-6'>
                            {viewedSubject?.introLectureInfo?.description}
                        </p>
                    </div>
                </div>
            </CardTemplate>
        </div>
    )
}

export default SubjectLectureCardFilled
