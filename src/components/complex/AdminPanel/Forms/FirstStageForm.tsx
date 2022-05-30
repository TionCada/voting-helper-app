import React, {useState} from 'react';
// @ts-ignore;
import FileInput from "../../../basic/FileInput";
import Button from "../../../basic/Button";
import {useForm} from "react-hook-form";
import {ProcessedSubjectData, ProcessedUserData, uploadSubjectsList, uploadUsersList} from "../../../../utils";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {enableDataLoading, updateAppStage} from "../../../../redux/slices/appSlice";
import Tippy from '@tippyjs/react';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import table_example_1 from '../../../../assets/table_example_1.png';
import table_example_2 from '../../../../assets/table_example_2.jpg';

function FirstStageForm() {

    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            subjectsList: File,
            studentsList: File,
        }
    });

    const [subjectsList, setSubjectsList] = useState<ProcessedSubjectData[] | null>(null);
    const [studentsList, setStudentsList] = useState<ProcessedUserData[] | null>(null);
    const {isDataLoading} = useAppSelector(state => state.app)

    return (
        <>
            <form onSubmit={handleSubmit(async () => {
                dispatch(enableDataLoading)
                subjectsList && await uploadSubjectsList(subjectsList, async () => {
                    studentsList && await uploadUsersList(studentsList, 'set', () => dispatch(updateAppStage(2)))
                })
            })} className='w-[450px] relative'>
                <p className='text-sm pt-6 pl-6'>
                    На цьому етапі необхідно завантажити список вибіркових дисциплін та список студентів
                </p>
                <div className='flex flex-col'>
                    <div className='flex flex-col pt-4 pl-6'>
                        <div className='flex flex-row items-center'>
                            <p className='text-[#208843] text-sm pb-2'>Список предметів</p>
                            <Tippy content={<img src={table_example_1}/>}>
                                <div className='h-4 mb-[7px] ml-1 hover:cursor-pointer'>
                                    <AiOutlineInfoCircle size={17}/>
                                </div>
                            </Tippy>
                        </div>
                        <FileInput validationProps={register('subjectsList', {required: true})}
                                   subjectsHandler={setSubjectsList}
                                   styles={`${errors.subjectsList && 'border-red-300'}`} dataType='subjects'/>
                    </div>
                    <div className='flex flex-col pt-4 pl-6'>
                        <div className='flex flex-row items-center'>
                            <p className='text-[#208843] text-sm pb-2'>Список студентів</p>
                            <Tippy content={<img src={table_example_2}/>}>
                                <div className='h-4 mb-[7px] ml-1.5 hover:cursor-pointer'>
                                    <AiOutlineInfoCircle size={17}/>
                                </div>
                            </Tippy>
                        </div>
                        <FileInput validationProps={register('studentsList', {required: true})}
                                   usersHandler={setStudentsList}
                                   styles={`${errors.studentsList && 'border-red-300'}`} dataType='users'/>
                    </div>
                </div>
                <div className='absolute bottom-[29px] right-[29px] w-24 h-[37.5px]'>
                    <Button isLoading={isDataLoading} isSubmit={true} label='Далі'/>
                </div>
            </form>
        </>
    )
}

export default FirstStageForm
