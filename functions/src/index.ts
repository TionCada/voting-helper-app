import {ObjectMetadata} from "firebase-functions/lib/providers/storage";
import {DownloadResponse} from "@google-cloud/storage";

const functions = require("firebase-functions");
import {Storage} from '@google-cloud/storage';
import {UserRole} from "../../src/types";

const admin = require('firebase-admin');
import {ParseResult} from "papaparse";

const papa = require("papaparse");
admin.initializeApp();

interface RawSubjectData {
    id: string,
    name: string,
    votes: number,
    controlType: string,
    department: string,
    ects: number,
    semester: number
}

interface RawUserData {
    login: string;
    password: string;
    name: string;
    role: UserRole;
    subjects: string;
}

exports.handleCSVfiles = functions.storage.object().onFinalize(async (object: ObjectMetadata) => {

    const registerUsers = async (data: RawUserData[]) => {
        data.forEach((user) => {
            admin.auth().createUser({
                email: `${user.login}@gmail.com`,
                password: user.password
            });
        })
    };

    const parseUsers = async (data: RawUserData[], actionType: 'set' | 'update') => {
        const parsedUsers = data.map(
            (item) => ({
                id: item.login,
                name: item.name,
                role: item.role,
                subjects: item.subjects
                    .slice(0, -1)
                    .split(';')
            })
        )
        if (actionType === 'set') {
            parsedUsers.forEach((item: any) => {
                admin.firestore()
                    .collection('users')
                    .doc(item.id)
                    .set(item)
            })
        } else if (actionType === 'update') {
            parsedUsers.forEach((item: any) => {
                admin.firestore()
                    .collection('users')
                    .doc(item.id)
                    .update({subjects: [...item.subjects]})
            })
        }
    }

    const parseSubjects = async (data: RawSubjectData[]) => {
        const parsedSubjects = data.map(
            (item) => ({
                id: item.id.slice(0, -1),
                name: item.name,
                votes: item.votes,
                basicInfo: {
                    controlType: item.controlType,
                    department: item.department,
                    ects: item.ects,
                    semester: item.semester
                },
                studyingInfo: null,
                introLectureInfo: null
            })
        )
        parsedSubjects.forEach((item: any) => {
            admin.firestore()
                .collection('subjects')
                .doc(item.id)
                .set(item)
        })
    }

    const storage = new Storage();
    const bucketPath = 'gs://voting-helper-backend.appspot.com';
    const bucket = storage.bucket(bucketPath);
    const filePath = object.name;
    const file = bucket.file(filePath!);

    file.download()
        .then((data: DownloadResponse) => {
            papa.parse(data.toString(),
                {
                    header: true, dynamicTyping: true,
                    complete: async (response: ParseResult<RawUserData | RawSubjectData>) => {
                        const folderName = filePath?.split('/')[0];
                        if (folderName === 'lecturers' || folderName === 'students') {
                            await parseUsers(response.data as RawUserData[], 'set')
                            await registerUsers(response.data as RawUserData[])
                        } else if (folderName === 'students_updated') {
                            await parseUsers(response.data as RawUserData[], 'update')
                        } else {
                            await parseSubjects(response.data as RawSubjectData[])
                        }
                    }
                }
            );
        });
});