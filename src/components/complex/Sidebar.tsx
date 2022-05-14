import React, {Dispatch, SetStateAction} from 'react'
import 'tippy.js/dist/tippy.css';
import SubjectMiniature from "./SubjectMiniature";
import {SelectedSubject, SelectiveSubject} from "../../types";

type SidebarProps = {
    subjectsList: SelectedSubject[] | SelectiveSubject[] | null;
    viewedSelectedSubject?: SelectedSubject | null;
    viewedSelectedSubjectHandler?: Dispatch<SetStateAction<SelectedSubject | null>>
    viewedSelectiveSubject?: SelectiveSubject | null;
    viewedSelectiveSubjectHandler?: Dispatch<SetStateAction<SelectiveSubject | null>>;
}

function Sidebar({
                     subjectsList, viewedSelectedSubject,
                     viewedSelectedSubjectHandler,
                     viewedSelectiveSubject,
                     viewedSelectiveSubjectHandler
                 }: SidebarProps) {
    return (
        <div className='flex flex-col gap-2 w-96 pt-8 border-r border-[#DFDFDF]'>
            <p className='pl-8 text-2xl'>Вибіркові дисципліни</p>
            <p className='pl-8 text-xs'>Список вибіркових дисциплін, з якими можна <br/>
                ознайомитись детальніше, наведені у списку нижче</p>
            <div style={{scrollbarWidth: 'thin'}} className='relative left-0 w-96 overflow-y-auto'>
                <div className='flex py-4 px-8 flex-col gap-4 w-full'>
                    {subjectsList?.map((subject) =>
                        <div onClick={() => {
                            if (subject && viewedSelectedSubjectHandler) {
                                viewedSelectedSubjectHandler(subject as SelectedSubject)
                            } else if (subject && viewedSelectiveSubjectHandler) {
                                viewedSelectiveSubjectHandler(subject as SelectiveSubject)
                            }
                        }}>
                            <SubjectMiniature
                                viewedSubjectName={viewedSelectedSubject?.name || viewedSelectiveSubject?.name || ''}
                                subjectName={subject.name}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar