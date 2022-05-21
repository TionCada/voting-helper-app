import React, {Dispatch, SetStateAction} from 'react'
import 'tippy.js/dist/tippy.css';
import SubjectMiniature from "./SubjectMiniature";
import {Subject} from "../../types";

type SidebarProps = {
    subjectsList: Subject[] | undefined;
    viewedSubject?: Subject | null;
    viewedSubjectHandler?: Dispatch<SetStateAction<Subject | null>>
}

function Sidebar({subjectsList, viewedSubject, viewedSubjectHandler}: SidebarProps) {

    return (
        <div className='flex flex-col gap-2 w-96 pt-8 border-r border-[#DFDFDF]'>
            <p className='pl-8 text-2xl'>Вибіркові дисципліни</p>
            <p className='pl-8 text-xs'>Список вибіркових дисциплін, з якими можна <br/>
                ознайомитись детальніше, наведені у списку нижче</p>
            <div style={{scrollbarWidth: 'thin'}} className='relative left-0 w-96 overflow-y-auto'>
                <div className='flex py-4 px-8 flex-col gap-4 w-full'>
                    {subjectsList?.map((subject) =>
                        <div onClick={() => {viewedSubjectHandler && viewedSubjectHandler(subject)}}>
                            <SubjectMiniature
                                viewedSubjectName={viewedSubject?.name}
                                subjectName={subject.name}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar