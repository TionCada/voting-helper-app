import {doc, writeBatch} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";
import {toast} from 'react-toastify';
import db from "./db";

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