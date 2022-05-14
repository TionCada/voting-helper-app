import React from 'react'
import 'tippy.js/dist/tippy.css';
import {Routes, Route} from "react-router-dom";
import LoginPage from "./pages/common/LoginPage";
import StudentAccount from "./accounts/StudentAccount";
import LecturerAccount from "./accounts/LecturerAccount";
import AdminAccount from "./accounts/AdminAccount";
import {useAppSelector} from "./redux/hooks";

function App() {

    const {stage, isUserAuthorized, userRole } = useAppSelector(state => state.app)

    return (
        <Routes>
            {!isUserAuthorized && <Route path='/' element={<LoginPage/>} />}
            {(userRole === 'student' && isUserAuthorized) && <Route path='/student' element={<StudentAccount appStage={stage}/>} />}
            {(userRole === 'lecturer' && isUserAuthorized) && <Route path='/lecturer' element={<LecturerAccount/>} />}
            {(userRole === 'admin' && isUserAuthorized) && <Route path='/admin' element={<AdminAccount appStage={stage}/>} />}
        </Routes>
    )
}

export default App
