import React from 'react';

interface CardProps {
    children: React.ReactNode;
    isActive?: boolean;
}

function CardTemplate({children, isActive}: CardProps) {

    return (
        <div className={`bg-[#F7F7F9] border border-[#DFDFDF] ${isActive && 'bg-[#E9ECEF]'}`}>
            {children}
        </div>
    )
}

export default CardTemplate
