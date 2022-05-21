import React from 'react';
import {HiCheck} from 'react-icons/hi';

interface StageStatusBarProps {
    status: 'disabled' | 'active' | 'fulfilled';
    text?: string;
}

function StageStatusBar({status, text}: StageStatusBarProps) {

    return (
        <div className={`flex justify-center w-[90px] border 
            ${status === 'disabled' && 'border-[#BABABA]'}
            ${status === 'active' && 'border-[#000000]'}
            ${status === 'fulfilled' && 'border-[#208843]'}`}
        >
            {status === 'fulfilled' ?
                <div className='text-[#208843]'>
                    <HiCheck size={32.5}/>
                </div>
                :
                <p className={`text-base px-4 py-1 
                    ${status === 'disabled' && 'text-[#BABABA]'}
                    ${status === 'active' && 'text-[#000000]'}`}
                >
                    {text}
                </p>
            }
        </div>
    )
}

export default StageStatusBar
