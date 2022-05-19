import React, {useState} from 'react';
import FileInput from "../../../basic/FileInput";
import Button from "../../../basic/Button";
import {useForm} from "react-hook-form";
import Tippy from '@tippyjs/react';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {ProcessedUserData, uploadUsersList} from "../../../../utils";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {enableDataLoading, updateAppStage} from "../../../../redux/slices/appSlice";
import table_example_2 from '../../../../assets/table_example_2.jpg';
import table_example_3 from '../../../../assets/table_example_3.jpg';

function ThirdStageForm() {

    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            lecturersList: '',
            studentsList: ''
        }
    });

    const [lecturersList, setLecturersList] = useState<ProcessedUserData[] | null>(null);
    const [studentsList, setStudentsList] = useState<ProcessedUserData[] | null>(null);
    const {isDataLoading} = useAppSelector(state => state.app)

    return (
        <form onSubmit={handleSubmit(async () => {
            dispatch(enableDataLoading)
            lecturersList && await uploadUsersList(lecturersList, 'set', async () => {
                studentsList && await uploadUsersList(studentsList, 'update', () => dispatch(updateAppStage(4)))
            })
        })} className='w-[450px] relative'>
            <p className='text-sm pt-6 pl-6'>
                На цьому етапі необхідно завантажити списки студентів з обраними дисциплінами та викладачів,
                що їх ведуть
            </p>
            <div className='flex flex-col pt-4 pl-6'>
                <div className='flex flex-row items-center'>
                    <p className='text-[#208843] text-sm pb-2'>Список викладачів:</p>
                    <Tippy content={<img src={table_example_3}/>}>
                        <div className='h-4 mb-[7px] ml-1 hover:cursor-pointer'>
                            <AiOutlineInfoCircle size={17}/>
                        </div>
                    </Tippy>
                </div>
                <FileInput validationProps={register('lecturersList', {required: true})}
                           usersHandler={setLecturersList} dataType='users'
                           styles={`${errors.lecturersList && 'border-red-300'}`}/>
            </div>
            <div className='flex flex-col pt-4 pl-6'>
                <div className='flex flex-row items-center'>
                    <p className='text-[#208843] text-sm pb-2'>Список студентів:</p>
                    <Tippy content={<img src={table_example_2}/>}>
                        <div className='h-4 mb-[7px] ml-1 hover:cursor-pointer'>
                            <AiOutlineInfoCircle size={17}/>
                        </div>
                    </Tippy>
                </div>
                <FileInput validationProps={register('studentsList', {required: true})}
                           usersHandler={setStudentsList} dataType='users'
                           styles={`${errors.studentsList && 'border-red-300'}`}/>
            </div>
            <div className='absolute bottom-[29px] right-[29px] w-24 h-[37.5px]'>
                <Button isLoading={isDataLoading} isSubmit={true} label='Далі'/>
            </div>
        </form>
    )
}

export default ThirdStageForm
