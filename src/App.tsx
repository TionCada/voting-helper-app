import React, {useEffect} from 'react'
import 'tippy.js/dist/tippy.css';
import {Routes, Route} from "react-router-dom";
import LoginPage from "./pages/common/LoginPage";
import StudentAccount from "./accounts/StudentAccount";
import LecturerAccount from "./accounts/LecturerAccount";
import AdminAccount from "./accounts/AdminAccount";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {fetchAppStage} from "./redux/slices/appSlice";
import LoadingScreen from "./components/complex/LoadingScreen";

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAppStage())
    }, [])

    const {stage, authorizedUserId, userRole } = useAppSelector(state => state.app)

    return (
        <Routes>
            {!authorizedUserId && <Route path='/' element={<LoginPage/>} />}
            {(userRole === 'student' && authorizedUserId) && <Route path='/student' element={<StudentAccount appStage={stage}/>} />}
            {(userRole === 'lecturer' && authorizedUserId) && <Route path='/lecturer' element={<LecturerAccount/>} />}
            {(userRole === 'admin' && authorizedUserId) && <Route path='/admin' element={<AdminAccount appStage={stage}/>} />}
        </Routes>
    )
}

export default App
