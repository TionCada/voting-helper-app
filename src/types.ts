export type AppStage = 1 | 2 | 3 | 4;
export type UserRole = 'student' | 'lecturer' | 'admin';

export type SelectedSubjectInfo = {
    lecturer: string;
    messenger: string;
    link: string;
}

export type SelectedSubject = {
    name: string;
    lectureInfo: SelectedSubjectInfo | null;
    practiceInfo: SelectedSubjectInfo | null;
}

export type SelectiveSubject = {
    name: string;
    votes: number;
    basicInfo: {
        semester: number;
        ects: number;
        controlType: string;
        department: string;
    };
    introLectureInfo: {
        description: string;
        lecturer: string;
        date: number;
        platform: string;
        link: string;
    } | null;
}