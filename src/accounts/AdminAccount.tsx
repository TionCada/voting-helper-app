import React, {useEffect} from 'react'
import 'tippy.js/dist/tippy.css';
import Header from "../components/complex/Header";
import AdminPanel from "../components/complex/AdminPanel/AdminPanel";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getAppStage} from "../redux/slices/appSlice";

function AdminAccount() {

    const {stage, authorizedUserData} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAppStage())
    }, [])

    return (
        <>
            <Header user={authorizedUserData?.name}/>
            <div className='flex flex-row w-screen h-[calc(100vh-5rem)]'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <p className='text-xl pb-5'>Панель Керування</p>
                    <AdminPanel currentStage={stage}/>
                </div>
            </div>
        </>
    )
}

export default AdminAccount;
