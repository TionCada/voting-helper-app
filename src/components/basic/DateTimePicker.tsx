import React from 'react';

interface DateTimePickerProps {
    placeholder: string;
    validationProps: any;
    styles?: string;
}

function DateTimePicker({placeholder, validationProps, styles}: DateTimePickerProps) {

    return (
        <input placeholder={placeholder} type='datetime-local'
               {...validationProps}
               className={`w-full h-full bg-[#FFFFFF] ${styles}
                   font-normal text-sm px-2.5 placeholder-[#6C757D]
                   border border-[#DFDFDF] focus:border-[#80BDFF] 
                   focus:outline focus:outline-3 focus:outline-[#92C7FF]`}
        />
    )
}

export default DateTimePicker
