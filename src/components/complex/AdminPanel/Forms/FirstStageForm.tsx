// @ts-nocheck
import React from 'react';
import FileInput from "../../../basic/FileInput";
import Button from "../../../basic/Button";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import Tippy from '@tippyjs/react';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import table_example_1 from '../../../../assets/table_example_1.png';
import table_example_2 from '../../../../assets/table_example_2.jpg';
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {enableDataLoading, updateAppStage} from "../../../../redux/slices/appSlice";

function FirstStageForm() {

    const storage = getStorage();
    const dispatch = useAppDispatch();
    const {isDataLoading} = useAppSelector(state => state.app)
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            subjectsList: File,
            studentsList: File,
        }
    });

    return (
        <>
            <form onSubmit={handleSubmit(async (data) => {
                dispatch(enableDataLoading)
                const studentsRef = ref(storage, `/students/${data.studentsList[0].name}`);
                await uploadBytes(studentsRef, data.studentsList[0])
                const subjectsRef = ref(storage, `/subjects/${data.subjectsList[0].name}`);
                await uploadBytes(subjectsRef, data.subjectsList[0])
                dispatch(updateAppStage(2))
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
                                   styles={`${errors.subjectsList && 'border-red-300'}`}/>
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
                                   styles={`${errors.studentsList && 'border-red-300'}`}/>
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
