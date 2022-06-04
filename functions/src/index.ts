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
    email: string;
    password: string;
    name: string;
    role: UserRole;
    subjects: string;
}

exports.handleLists = functions.storage.object().onFinalize(async (object: ObjectMetadata) => {

    const registerUsers = async (data: RawUserData[]) => {
        data.forEach((user) => {
            try {
                admin.auth().createUser({
                    email: `${user.email}@gmail.com`,
                    password: user.password
                });
            } catch (err) {
                functions.logger.log("Error:", err);
            }
        })
    };

    const parseUsers = async (data: RawUserData[]) => {
        const parsedUsers = data.map(
            (item) => ({
                ...item,
                subjects: item.subjects
                    .slice(0, -1)
                    .split(';')
            })
        )
        functions.logger.log("Users:", parsedUsers);
    }

    const parseSubjects = (data: RawSubjectData[]) => {
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
        functions.logger.log("Subjects:", parsedSubjects);
    }

    const storage = new Storage();
    const fileBucket = 'gs://voting-helper-backend.appspot.com';
    const filePath = object.name;
    const bucket = storage.bucket(fileBucket);
    const file = bucket.file(filePath!);

    file.download()
        .then((data: DownloadResponse) => {
            const temp = data.toString();
            papa.parse(temp,
                {
                    header: true, dynamicTyping: true,
                    complete(response: ParseResult<RawUserData | RawSubjectData>) {
                        const folderName = filePath?.split('/')[0];
                        functions.logger.log("ParsedSubjects:", response.data);
                        if (folderName === 'users') {
                            parseUsers(response.data as RawUserData[])
                            registerUsers(response.data as RawUserData[])
                        } else if (folderName === 'subjects')
                            parseSubjects(response.data as RawSubjectData[])
                    }
                }
            );
        });
});