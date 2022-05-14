import React from 'react'
import Button from "../basic/Button";

interface HeaderProps {
    user: string;
}

function Header({user}: HeaderProps) {

    return (
        <div className='flex gap-8 items-center justify-end
            w-screen h-20 pr-9
            bg-[#F7F7F9] border-b border-b-[#D1D4D7]'
        >
            <p className='text-base font-light text-[#208843]'>{user}</p>
            <div className='h-8 w-20'>
                <Button label='Вихід' styles='text-sm'/>
            </div>
        </div>
    )
}

export default Header
