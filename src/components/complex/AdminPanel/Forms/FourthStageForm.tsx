import React from 'react';
import Button from "../../../basic/Button";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {clearDatabase} from "../../../../utils";
import {enableDataLoading, updateAppStage} from "../../../../redux/slices/appSlice";

function FourthStageForm() {

    const dispatch = useAppDispatch();
    const {isDataLoading} = useAppSelector(state => state.app)

    return (
        <div className='w-[450px] relative'>
            <p className='text-sm pt-6 pl-6 pr-[20px]'>
                На цьому етапі студенти готуються до навчання, а викладачі самостійно додають необхідну
                інформацію. Ніяких додаткових дій виконувати не потрібно
            </p>
            <div className='absolute bottom-[29px] right-[29px] w-[110px] h-[37.5px]'>
                <Button isLoading={isDataLoading} onClick={async () => {
                    dispatch(enableDataLoading)
                    await clearDatabase(() => dispatch(updateAppStage(1)))
                }} label='Завершити'/>
            </div>
        </div>
    )
}

export default FourthStageForm
