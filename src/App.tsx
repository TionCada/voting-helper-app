import React, {useEffect} from 'react'
import 'tippy.js/dist/tippy.css';
import {Routes, Route} from "react-router-dom";
import LoginPage from "./pages/common/LoginPage";
import StudentAccount from "./accounts/StudentAccount";
import LecturerAccount from "./accounts/LecturerAccount";
import AdminAccount from "./accounts/AdminAccount";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {auth} from "./db";
import {clearAuthorizedUserData, getGeneralData} from "./redux/slices/appSlice";
import { useNavigate } from 'react-router-dom';

function App() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {authorizedUserData} = useAppSelector(state => state.app)
    const role = authorizedUserData?.role
    const id = authorizedUserData?.id

    useEffect(() => {
        auth.onAuthStateChanged(() => {
            if (auth.currentUser !== null) {
                auth.currentUser?.email && dispatch(getGeneralData(auth.currentUser?.email.slice(0, -10)))
            } else {
                dispatch(clearAuthorizedUserData);
                navigate('/');
            }
        })
    }, [])

    useEffect(() => {
        if (authorizedUserData !== null) {
            navigate(authorizedUserData.role);
        }
    }, [authorizedUserData])

    return (
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            {(id && role === 'admin') && <Route path='/admin' element={<AdminAccount/>}/>}
            {(id && role === 'student') && <Route path='/student' element={<StudentAccount/>}/>}
            {(id && role === 'lecturer') && <Route path='/lecturer' element={<LecturerAccount/>}/>}
        </Routes>
    )
}

export default App
