import React from 'react';
import {VscError} from 'react-icons/vsc';

function ErrorScreen() {

    return (
        <div className='z-50 fixed top-[80px] left-0 w-screen bg-white h-[calc(100vh-5rem)] flex flex-col items-center justify-center'>
            <VscError size={60}/>
            <p className='text-center pt-2 font-normal text-lg'>Не вдалось завантажити сторінку</p>
        </div>
    )
}

export default ErrorScreen
