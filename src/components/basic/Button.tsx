import React from 'react';
import Spinner from '../../assets/spinner_light.svg';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    isLoading?: boolean;
    isSubmit?: boolean;
    styles?: string;
}

function Button({label, onClick, isLoading, isSubmit, styles}: ButtonProps) {

    return (
        <button type={isSubmit ? 'submit' : 'button'} onClick={onClick} disabled={isLoading}
                className={`justify-center items-center w-full h-full ease-in duration-200 
                border border-[#F08833] text-white text-base font-normal bg-[#F0A433] flex
                focus:outline focus:outline-3 focus:outline-[#92C7FF] ${styles}`}>
            {isLoading ? <img className='w-5 h-5 pt-[1.2px]' src={Spinner}/> : label}
        </button>
    )
}

export default Button
