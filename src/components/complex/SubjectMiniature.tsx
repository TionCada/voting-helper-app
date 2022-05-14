import React from 'react'
import 'tippy.js/dist/tippy.css';
import CardTemplate from "./CardTemplate";
import Tippy from '@tippyjs/react';

interface SubjectMiniatureProps {
    viewedSubjectName?: string;
    subjectName: string;
}

function SubjectMiniature({viewedSubjectName, subjectName}: SubjectMiniatureProps) {

    return (
        <CardTemplate isActive={viewedSubjectName === subjectName}>
            <Tippy content={subjectName}>
                <p className={`font-light text-base text-[#208843] text-ellipsis
                    w-[268px] pl-4 pr-[15px] py-3 hover:cursor-pointer whitespace-nowrap 
                    overflow-hidden ${viewedSubjectName === subjectName && 'text-black'}`}>
                    {subjectName}
                </p>
            </Tippy>
        </CardTemplate>
    )
}

export default SubjectMiniature