import React, {useEffect} from 'react'
import 'tippy.js/dist/tippy.css';
import CardTemplate from "./CardTemplate";
import Button from "../basic/Button";
import Input from "../basic/Input";
import {useForm} from "react-hook-form";
import {Subject, SubjectStudyingInfo} from "../../types";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {updateSubjectStudyingInfo} from "../../redux/slices/appSlice";

type ChosenSubjectCardEditedProps = {
    subject: Subject | null;
}

export interface SubjectStudyingInfoFormData {
    subjectId?: string;
    lectureInfo: SubjectStudyingInfo;
    practiceInfo: SubjectStudyingInfo;
}

export interface SubjectIntroLectureInfoFormData {
    subjectId?: string;
    introLectureInfo: {
        description: string;
        lecturer: string;
        date: number;
        platform: string;
        link: string;
    }
}

function ChosenSubjectCardEdited({subject}: ChosenSubjectCardEditedProps) {

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            practician: subject?.studyingInfo?.practiceInfo?.lecturer,
            practiceMessenger: subject?.studyingInfo?.practiceInfo?.messenger,
            practiceChatLink: subject?.studyingInfo?.practiceInfo?.link,
            lecturer: subject?.studyingInfo?.practiceInfo?.lecturer,
            lectureMessenger: subject?.studyingInfo?.practiceInfo?.messenger,
            lectureChatLink: subject?.studyingInfo?.practiceInfo?.link
        }
    });

    useEffect(() => {
        reset({
            practician: subject?.studyingInfo === null ? '' : subject?.studyingInfo?.practiceInfo?.lecturer,
            practiceMessenger: subject?.studyingInfo === null ? '' : subject?.studyingInfo?.practiceInfo?.messenger,
            practiceChatLink: subject?.studyingInfo === null ? '' : subject?.studyingInfo?.practiceInfo?.link,
            lecturer: subject?.studyingInfo === null ? '' : subject?.studyingInfo?.practiceInfo?.lecturer,
            lectureMessenger: subject?.studyingInfo === null ? '' : subject?.studyingInfo?.practiceInfo?.messenger,
            lectureChatLink: subject?.studyingInfo === null ? '' : subject?.studyingInfo?.practiceInfo?.link
        })
    }, [subject])

    const dispatch = useAppDispatch();
    const {isDataLoading} = useAppSelector(state => state.app)

    return (
        <div className='w-fit pt-6 px-8'>
            <CardTemplate>
                <form onSubmit={handleSubmit((data) => {
                    dispatch(updateSubjectStudyingInfo({
                        subjectId: subject?.id!,
                        lectureInfo: {
                            lecturer: data.lecturer!,
                            messenger: data.lectureMessenger!,
                            link: data.lectureChatLink!
                        },
                        practiceInfo: {
                            lecturer: data.practician!,
                            messenger: data.practiceMessenger!,
                            link: data.practiceChatLink!
                        }
                    }))
                })} className='px-10 pb-6'>
                    <div className='flex flex-row gap-14 pt-4 pb-6'>
                        <div className='flex flex-col gap-2.5'>
                            <p className='text-lg font-light text-[#208843]'>Інформація про практичні</p>
                            <div className='flex w-60 h-10'>
                                <Input validationProps={register('practician', {required: true})}
                                       placeholder='Викладач' styles={`${errors.practician && 'border-red-300'}`}/>
                            </div>
                            <div className='flex w-60 h-10'>
                                <Input validationProps={register('practiceMessenger', {required: true})}
                                       placeholder='Мессенджер' styles={`${errors.practiceMessenger && 'border-red-300'}`}/>
                            </div>
                            <div className='flex w-60 h-10'>
                                <Input validationProps={register('practiceChatLink', {required: true})} isURL={true}
                                       placeholder='Посилання на груповий чат' styles={`${errors.practiceChatLink && 'border-red-300'}`}/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2.5'>
                            <p className='text-lg font-light text-[#208843]'>Інформація про лекції</p>
                            <div className='flex w-60 h-10'>
                                <Input validationProps={register('lecturer', {required: true})}
                                       placeholder='Викладач' styles={`${errors.lecturer && 'border-red-300'}`}/>
                            </div>
                            <div className='flex w-60 h-10'>
                                <Input validationProps={register('lectureMessenger', {required: true})}
                                       placeholder='Мессенджер' styles={`${errors.lectureMessenger && 'border-red-300'}`}/>
                            </div>
                            <div className='flex w-60 h-10'>
                                <Input validationProps={register('lectureChatLink', {required: true})} isURL={true}
                                       placeholder='Посилання на груповий чат' styles={`${errors.lectureChatLink && 'border-red-300'}`}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex pl-[297px] h-10'>
                        <Button isSubmit={true} isLoading={isDataLoading} label='Зберегти'/>
                    </div>
                </form>
            </CardTemplate>
        </div>
    )
}

export default ChosenSubjectCardEdited;
