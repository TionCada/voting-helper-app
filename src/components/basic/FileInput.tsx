import React from 'react'
import 'tippy.js/dist/tippy.css';

interface FileInputProps {
    validationProps: any;
    styles?: string;
}

function FileInput({validationProps, styles}: FileInputProps) {

    return (
        <input type='file' accept='.csv' {...validationProps}
               className={`file:border-r-[1px] file:border-r-[#DFDFDF] file:border-solid
               file:border-l-0 file:border-t-0 file:border-b-0 font-normal file:font-medium
               file:bg-[#F0A433] file:px-4 file:py-2 w-60 file:mr-3 file:text-white text-[#6C757D]
               file:text-sm text-sm file:cursor-pointer border border-[#DFDFDF] ${styles}`}
        />
    )
}

export default FileInput;