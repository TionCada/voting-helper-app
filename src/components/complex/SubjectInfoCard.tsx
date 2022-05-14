import React from 'react';
import CardTemplate from "./CardTemplate";
import {SelectiveSubject} from "../../types";

type SubjectInfoCardProps = {
    subject: SelectiveSubject | null;
}

function SubjectInfoCard({subject}: SubjectInfoCardProps) {

    const calculateCourse = (semester: number | undefined) => {
        if (semester !== undefined) {
            return (semester % 2 === 0) ? (semester / 2) : Math.floor(semester / 2) + 1
        } else {
            return 0
        }
    }

    const calculateSemester = (semester: number | undefined) => {
        if (semester !== undefined) {
            return (semester % 2 === 0) ? 2 : 1
        } else {
            return 0
        }
    }

    return (
        <div className='w-fit px-8 pt-6'>
            <CardTemplate>
                <div className='flex gap-10 justify-between px-10 py-3 text-base font-light'>
                    <div className='flex flex-row gap-1'>
                        <p>Курс:</p>
                        <p className='text-[#208843]'>{calculateCourse(subject?.basicInfo.semester)}</p>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <p>Семестр:</p>
                        <p className='text-[#208843]'>{calculateSemester(subject?.basicInfo.semester)}</p>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <p>ECTS:</p>
                        <p className='text-[#208843]'>{subject?.basicInfo.ects}</p>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <p>Тип контролю:</p>
                        <p className='text-[#208843]'>{subject?.basicInfo.controlType}</p>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <p>Читає кафедра:</p>
                        <p className='text-[#208843]'>{subject?.basicInfo.department}</p>
                    </div>
                </div>
            </CardTemplate>
        </div>
    )
}

export default SubjectInfoCard
