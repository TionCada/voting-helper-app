import React, {useEffect} from 'react'
import 'tippy.js/dist/tippy.css';
import CardTemplate from "./CardTemplate";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Textarea from "../basic/Textarea";
import {AiOutlineInfoCircle} from 'react-icons/ai'
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import DateTimePicker from "../basic/DateTimePicker";
import {GrClose} from 'react-icons/gr';
import {useForm} from "react-hook-form";
import {Subject} from "../../types";
import moment from 'moment'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {updateSubjectIntroLectureInfo, updateSubjectStudyingInfo} from "../../redux/slices/appSlice";

interface SubjectLectureCardEditedProps {
    subject: Subject | null;
    onClickHandler: () => void;
}

function SubjectLectureCardEdited({subject, onClickHandler}: SubjectLectureCardEditedProps) {

    console.log(subject)

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            dateTime: subject?.introLectureInfo && moment(subject?.introLectureInfo?.date).format('yy-MM-DD HH:mm'),
            shortDescription: subject?.introLectureInfo?.description,
            lecturer: subject?.introLectureInfo?.lecturer,
            platform: subject?.introLectureInfo?.platform,
            link: subject?.introLectureInfo?.link,
        }
    });

    useEffect(() => {
        reset({
            dateTime: subject?.introLectureInfo === null ? '' : moment(subject?.introLectureInfo?.date).format('yy-MM-DD HH:mm'),
            shortDescription: subject?.introLectureInfo === null ? '' : subject?.introLectureInfo?.description,
            lecturer: subject?.introLectureInfo === null ? '' : subject?.introLectureInfo?.lecturer,
            platform: subject?.introLectureInfo === null ? '' : subject?.introLectureInfo?.platform,
            link: subject?.introLectureInfo === null ? '' : subject?.introLectureInfo?.link,
        })
    }, [subject])

    const dispatch = useAppDispatch();
    const {isDataLoading} = useAppSelector(state => state.app)

    return (
        <div
            className='fixed z-50 top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-20'>
            <div className='w-fit opacity-100 relative'>
                <CardTemplate>
                    <div className='absolute right-4 top-4 hover:cursor-pointer' onClick={onClickHandler}>
                        <GrClose size={15}/>
                    </div>
                    <form onSubmit={handleSubmit((data) => {
                        dispatch(updateSubjectIntroLectureInfo({
                            subjectId: subject?.id!,
                            introLectureInfo: {
                                description: data.shortDescription!,
                                date: parseInt(moment(data.dateTime).format('x'), 10),
                                lecturer: data.lecturer!,
                                platform: data.platform!,
                                link: data.link!
                            }
                        }))
                    })}
                          className='px-10 py-8'>
                        <div className='flex flex-row gap-10 pt-4 pb-6'>
                            <div className='flex flex-col gap-2.5'>
                                <div className='flex flex-row items-end'>
                                    <p className='text-lg font-light text-[#208843]'>???????????????? ????????</p>
                                    <Tippy content='???????????????? ???????? ?????????????? ???????????? "???????????? ??????????????" (???? 450 ????????)'>
                                        <div className='h-4 mb-[6px] ml-1.5 hover:cursor-pointer'>
                                            <AiOutlineInfoCircle size={17}/>
                                        </div>
                                    </Tippy>
                                </div>
                                <Textarea styles={`${errors.shortDescription && 'border-red-300'}`}
                                          validationProps={register('shortDescription', {required: true})}/>
                            </div>
                            <div className='flex flex-col gap-2.5'>
                                <div className='flex flex-row items-end'>
                                    <p className='text-lg font-light text-[#208843]'>???????????? ????????????</p>
                                    <Tippy content='?????????? ?????????????? ???????????? ?? ???????????????????????? ?????????????????? ??
                                        ???????????????????? ?????????????????????? ???? ?????????????????? ???? ???? ???????????????????? ????????????????'>
                                        <div className='h-4 mb-[6px] ml-1.5 hover:cursor-pointer'>
                                            <AiOutlineInfoCircle size={17}/>
                                        </div>
                                    </Tippy>
                                </div>
                                <div className='flex w-60 h-10'>
                                    <Input validationProps={register('lecturer', {required: true})}
                                           placeholder='????????????????' styles={`${errors.lecturer && 'border-red-300'}`}/>
                                </div>
                                <div className='flex w-60 h-10'>
                                    <Input validationProps={register('platform', {required: true})}
                                           placeholder='??????????????????' styles={`${errors.platform && 'border-red-300'}`}/>
                                </div>
                                <div className='flex w-60 h-10'>
                                    <DateTimePicker validationProps={register('dateTime', {required: true})}
                                                    placeholder='????????'
                                                    styles={`${errors.dateTime && 'border-red-300'}`}/>
                                </div>
                                <div className='flex w-60 h-10'>
                                    <Input isURL={true} validationProps={register('link', {required: true})}
                                           placeholder='?????????????????? ???? ????????????'
                                           styles={`${errors.link && 'border-red-300'}`}/>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <p className='whitespace-nowrap overflow-hidden text-ellipsis pt-[8px] w-96 text-xl font-normal'>
                                {subject?.name}
                            </p>
                            <div className='w-[280px] flex pl-10 h-10'>
                                <Button isLoading={isDataLoading} isSubmit={true} label='????????????????'/>
                            </div>
                        </div>
                    </form>
                </CardTemplate>
            </div>
        </div>
    )
}

export default SubjectLectureCardEdited;
