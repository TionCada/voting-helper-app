import React, {useState} from 'react';
import Button from "../../../basic/Button";
import SubjectMiniature from "../../SubjectMiniature";
import {useAppSelector} from "../../../../redux/hooks";
import SubjectLectureCardEdited from "../../SubjectLectureCard-edited";
import {SelectiveSubject} from "../../../../types";

function SecondStageForm() {

    const {pendingSubjects} = useAppSelector(state => state.admin)
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [viewedSubject, setViewedSubject] = useState<SelectiveSubject | null>(pendingSubjects[0] || null)

    return (
        <>
            <div className='w-[450px] relative'>
                <p className='text-sm pt-6 pl-6 pr-[10px]'>
                    На цьому етапі студенти обирають предмети з яких хотіли б послухати ввідні лекції, необхідно
                    додати дану інформацію
                </p>
                <div style={{scrollbarWidth: 'thin'}}
                     className='flex pl-[25px] pr-[12px] flex-col gap-4 w-[314px] mt-[20px] h-[143px] overflow-y-auto'>
                    {pendingSubjects.length > 0 ? pendingSubjects.map((subject) => <>
                            {isModalOpened &&
                            <SubjectLectureCardEdited subject={viewedSubject}
                                                      onClickHandler={() => setIsModalOpened(!isModalOpened)}/>}
                            <div onClick={() => {
                                setIsModalOpened(!isModalOpened)
                                setViewedSubject(subject)
                            }}>
                                <SubjectMiniature subjectName={subject?.name}/>
                            </div>
                        </>
                    ) : <p className='text-sm font-medium'>Студенти поки не проголосували за жоден з предметів</p>}
                </div>
                <div className='absolute bottom-[29px] right-[29px] w-24 h-[37.5px]'>
                    <Button label='Далі'/>
                </div>
            </div>
        </>
    )
}

export default SecondStageForm
