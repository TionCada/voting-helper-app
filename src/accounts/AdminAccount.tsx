import React from 'react'
import 'tippy.js/dist/tippy.css';
import Header from "../components/complex/Header";
import AdminPanel from "../components/complex/AdminPanel/AdminPanel";
import {useAppSelector} from "../redux/hooks";

function AdminAccount() {

    const {stage, authorizedUserData} = useAppSelector(state => state.app)

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
