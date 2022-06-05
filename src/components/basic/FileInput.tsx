import 'tippy.js/dist/tippy.css';
import React from 'react';

interface FileInputProps {
    styles?: string;
    validationProps: any;
}

function FileInput({validationProps, styles}: FileInputProps) {

    return (
        <input type='file' accept='.csv' {...validationProps}
               className={`file:border-r-[1px] file:border-r-[#DFDFDF] file:border-solid file:border-l-0 file:border-t-0
               file:border-b-0 file:font-medium font-normal file:bg-[#F0A433] file:py-2 w-60 file:mr-3 file:text-white 
               text-[#6C757D] file:px-4 file:text-sm text-sm file:cursor-pointer border border-[#DFDFDF] ${styles}`}
        />
    )
}

export default FileInput;