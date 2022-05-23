import React from 'react'
import 'tippy.js/dist/tippy.css';
import {Routes, Route} from "react-router-dom";
import LoginPage from "./pages/common/LoginPage";
import StudentAccount from "./accounts/StudentAccount";
import LecturerAccount from "./accounts/LecturerAccount";
import AdminAccount from "./accounts/AdminAccount";
import {useAppSelector} from "./redux/hooks";

function App() {

    const {authorizedUserData} = useAppSelector(state => state.app)
    const role = authorizedUserData?.role
    // const id = authorizedUserData?.id

    return (
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/admin' element={<AdminAccount/>}/>
            <Route path='/student' element={<StudentAccount/>}/>
            <Route path='/lecturer' element={<LecturerAccount/>}/>
            {/*{!id && <Route path='/' element={<LoginPage/>}/>}*/}
            {/*{(id && role === 'admin') && <Route path='/admin' element={<AdminAccount/>}/>}*/}
            {/*{(id && role === 'student') && <Route path='/student' element={<StudentAccount/>}/>}*/}
            {/*{(id && role === 'lecturer') && <Route path='/lecturer' element={<LecturerAccount/>}/>}*/}
        </Routes>
    )
}

export default App
