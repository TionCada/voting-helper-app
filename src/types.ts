export type AppStage = 1 | 2 | 3 | 4;
export type UserRole = 'student' | 'lecturer' | 'admin';

export type SubjectStudyingInfo = {
    lecturer: string;
    messenger: string;
    link: string;
}

export type SubjectBasicInfo = {
    semester: number;
    ects: number;
    controlType: string;
    department: string;
}

export type Subject = {
    name: string;
    votes: number;
    basicInfo: SubjectBasicInfo;
    introLectureInfo: {
        description: string;
        lecturer: string;
        date: number;
        platform: string;
        link: string;
    } | null;
    studyingInfo: {
        lectureInfo: SubjectStudyingInfo;
        practiceInfo: SubjectStudyingInfo;
    } | null;
}