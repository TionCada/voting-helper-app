import React from 'react';
import Spinner from '../../assets/spinner_light.svg';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
    isSubmit?: boolean;
    styles?: string;
}

function Button({label, onClick, isLoading, isDisabled, isSubmit, styles}: ButtonProps) {

    return (
        <button type={isSubmit ? 'submit' : 'button'} onClick={onClick} disabled={isDisabled || isLoading}
                className={`justify-center items-center w-full h-full ease-in duration-200 
                border border-[#F08833] text-white text-base font-normal bg-[#F0A433] flex
                focus:outline focus:outline-3 focus:outline-[#92C7FF] ${styles} 
                ${isDisabled && 'text-[#BABABA] border-[#E9ECEF] bg-[#E9ECEF]'}`}>
            {isLoading ? <img className='w-5 h-5 pt-[1.2px]' src={Spinner}/> : label}
        </button>
    )
}

export default Button
