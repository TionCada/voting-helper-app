import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    isSubmit?: boolean;
    styles?: string;
}

function Button({label, onClick, isSubmit, styles}: ButtonProps) {

    return (
        <button type={isSubmit ? 'submit' : 'button'} onClick={onClick}
                className={`w-full h-full bg-[#F0A433] ease-in duration-200 
                border border-[#F08833] text-white text-base font-normal
                focus:outline focus:outline-3 focus:outline-[#92C7FF] ${styles}
                `}
        >
            {label}
        </button>
    )
}

export default Button
