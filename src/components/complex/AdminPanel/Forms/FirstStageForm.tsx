import React from 'react';
import FileInput from "../../../basic/FileInput";
import Button from "../../../basic/Button";
import {useForm} from "react-hook-form";

function FirstStageForm() {

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            studentsList: '',
        }
    });
    
    return (
        <form onSubmit={handleSubmit((data) => {alert(JSON.stringify(data))})} className='w-[450px] relative'>
            <p className='text-sm pt-6 pl-6'>
                На цьому етапі необхідно завантажити список студентів з доступними їм вибірковими
                дисциплінами
            </p>
            <div className='flex flex-col pt-4 pl-6'>
                <p className='text-[#208843] text-sm pb-2'>Список студентів:</p>
                <FileInput validationProps={register('studentsList', {required: true})}
                           styles={`${errors.studentsList && 'border-red-300'}`}/>
            </div>
            <div className='absolute bottom-[29px] right-[29px] w-24 h-[37.5px]'>
                <Button isSubmit={true} label='Далі'/>
            </div>
        </form>
    )
}

export default FirstStageForm
