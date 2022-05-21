import React from 'react';

interface TextareaProps {
    validationProps: any;
    styles?: string;
}

function Textarea({validationProps, styles}: TextareaProps) {

    return (
        <textarea style={{scrollbarWidth: 'thin'}} maxLength={450} {...validationProps}
            className={`h-[190px] border border-[#DFDFDF] resize-none text-sm ${styles}
            focus:outline focus:outline-[3.2px] focus:outline-[#92C7FF] px-3 py-2 w-96`}
        />
    )
}

export default Textarea
