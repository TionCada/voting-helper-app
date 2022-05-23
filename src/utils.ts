import {doc, writeBatch} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentData = firebase.firestore.DocumentData;
import {toast} from 'react-toastify';
import db from "./db";

export type ProcessedUserData = {
    login: string;
    password: string;
    name: string;
    role: string;
    subjects: DocumentReference<DocumentData>[];
}

export type ProcessedSubjectData = {
    id: string;
    name: string;
    votes: number;
    basicInfo: {
        controlType: string;
        department: string;
        ects: number;
        semester: number;
    }
    introLectureInfo: null;
    studyingInfo: null;
}

export const uploadUsersList = async (data: ProcessedUserData[], actionType: 'set' | 'update', callbackFunc?: () => void) => {
    try {
        if (actionType === 'set') {
            const batch = writeBatch(db);
            data.forEach((item) => {
                const docRef = doc(db, 'users', item.login)
                batch.set(docRef, item)
            })
            await batch.commit()
        } else if (actionType === 'update') {
            const batch = writeBatch(db);
            data.forEach((item) => {
                const docRef = doc(db, 'users', item.login)
                batch.update(docRef, {
                    subjects: [...item.subjects]
                })
            })
            await batch.commit()
        }
        callbackFunc && callbackFunc()
        toast.success('Користувачі успішно завантажені')
    } catch (err) {
        toast.error('Помилка при завантаженні користувачів')
        console.log(err)
    }
}

export const uploadSubjectsList = async (data: ProcessedSubjectData[], callbackFunc?: () => void) => {
    try {
        const batch = writeBatch(db);
        data.forEach((item) => {
            const docRef = doc(db, 'subjects', item.id)
            batch.set(docRef, item);
        })
        await batch.commit()
        callbackFunc && callbackFunc()
        toast.success('Предмети успішно завантажені')
    } catch (err) {
        toast.error('Помилка при завантаженні предметів')
        console.log(err)
    }
}

export const clearDatabase = async (callbackFunc?: () => void) => {
    try {
        const batch = writeBatch(db);

        const subjectsSnapshot = await getDocs(collection(db, "subjects"));
        subjectsSnapshot.forEach((document) => {
            if (document.id !== 'initial_subject') {
                const docRef = doc(db, 'subjects', document.id)
                batch.delete(docRef);
            }
        });

        const usersSnapshot = await getDocs(collection(db, "users"));
        usersSnapshot.forEach((document) => {
            if (document.id !== 'admin') {
                const docRef = doc(db, 'users', document.id)
                batch.delete(docRef);
            }
        });

        await batch.commit()
        callbackFunc && callbackFunc()
    } catch (err) {
        toast.error('Помилка при видаленні даних')
        console.log(err)
    }
}