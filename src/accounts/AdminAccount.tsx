import React from 'react'
import 'tippy.js/dist/tippy.css';
import Header from "../components/complex/Header";
import AdminPanel from "../components/complex/AdminPanel/AdminPanel";
import {AppStage} from "../types";
import {useAppSelector} from "../redux/hooks";

interface AdminAccountProps {
    appStage: AppStage;
}

function AdminAccount({appStage}: AdminAccountProps) {

    const { name } = useAppSelector(state => state.admin)

    return (
        <>
            <Header user={name}/>
            <div className='flex flex-row w-screen h-[calc(100vh-5rem)]'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <p className='text-xl pb-5'>Панель Керування</p>
                    <AdminPanel currentStage={appStage}/>
                </div>
            </div>
        </>
    )
}

export default AdminAccount;
