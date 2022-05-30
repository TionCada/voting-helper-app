import * as functions from "firebase-functions";
import * as Papa from "papaparse";

exports.parseStudents = functions.storage.bucket("voting-helper-backend.appspot.com").object().onFinalize(() => {
    type UserRole = 'student' | 'lecturer' | 'admin';

    interface RawUserData {
        email: string;
        password: string;
        name: string;
        role: UserRole;
        subjects: string;
    }

    const parseFile = (file: any, dataType: 'users') => {
        file && Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            worker: true,
            complete: (response: Papa.ParseResult<RawUserData>) => {
                dataType == 'users' && userParserFunc(response as Papa.ParseResult<RawUserData>)
                console.log(response)
            }
        })
    }

    const userParserFunc = (response: Papa.ParseResult<RawUserData>): any => {
        const parsedUsers = response.data.map(
            (item) => ({
                ...item,
                subjects: item.subjects
                    .slice(0, -1)
                    .split(';')
            })
        )
        console.log('users', parsedUsers)
    }

    console.log(parseFile);
});