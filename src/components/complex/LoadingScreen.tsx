import React from 'react';
import Spinner from '../../assets/spinner_dark.svg';

function LoadingScreen() {

    return (
        <div className='z-50 fixed top-[80px] left-0 w-screen bg-white
            h-[calc(100vh-5rem)] flex items-center justify-center'>
            <img className='w-[80px] h-[80px]' src={Spinner}/>
        </div>
    )
}

export default LoadingScreen
