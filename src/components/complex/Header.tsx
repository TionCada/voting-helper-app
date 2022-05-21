import React from 'react'
import Button from "../basic/Button";
import {ToastContainer} from 'react-toastify';
import {useAppSelector} from "../../redux/hooks";
import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";

interface HeaderProps {
    user: string | undefined;
}

function Header({user}: HeaderProps) {

    const {isDataLoading, isErrorOccurred} = useAppSelector(state => state.app)

    return (
        <div className='items-center justify-end w-screen h-20 pr-9
            bg-[#F7F7F9] border-b border-b-[#D1D4D7] flex gap-8'
        >
            {isDataLoading && <LoadingScreen/>}
            {isErrorOccurred && <ErrorScreen/>}
            <ToastContainer position="bottom-right"/>
            <p className='text-base font-light text-[#208843]'>{user || '—'}</p>
            <div className='h-8 w-20'>
                <Button label='Вихід' styles='text-sm'/>
            </div>
        </div>
    )
}

export default Header
