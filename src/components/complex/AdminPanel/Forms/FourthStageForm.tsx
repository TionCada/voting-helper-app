import React from 'react';
import Button from "../../../basic/Button";

function FourthStageForm() {

    return (
        <div className='w-[450px] relative'>
            <p className='text-sm pt-6 pl-6 pr-[20px]'>
                На цьому етапі студенти готуються до навчання, а викладачі самостійно додають необхідну
                інформацію. Ніяких додаткових дій виконувати не потрібно
            </p>
            <div className='absolute bottom-[29px] right-[29px] w-24 h-[37.5px]'>
                <Button label='Далі'/>
            </div>
        </div>
    )
}

export default FourthStageForm
