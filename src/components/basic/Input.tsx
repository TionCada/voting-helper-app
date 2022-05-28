import React from 'react';

interface InputProps {
    placeholder: string;
    validationProps: any;
    isURL?: boolean;
    isPassword?: boolean;
    styles?: string;
}

function Input({placeholder, validationProps, isURL, isPassword, styles}: InputProps) {

    return (
        <input placeholder={placeholder} {...validationProps}
               type={isPassword && 'password' || isURL && 'url'}
               className={`w-full h-full bg-[#FFFFFF] ${styles} font-normal text-sm focus:outline px-2.5
               placeholder-[#6C757D] focus:outline-[#92C7FF] border border-[#DFDFDF] focus:outline-3`}
        />
    )
}

export default Input
