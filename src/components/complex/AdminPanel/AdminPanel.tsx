import React from 'react';
import 'tippy.js/dist/tippy.css';
import CardTemplate from "../CardTemplate";
import StageStatusBar from "../StageStatusBar";
import 'tippy.js/dist/tippy.css';
import {AppStage} from "../../../types";
import FirstStageForm from "./Forms/FirstStageForm";
import SecondStageForm from "./Forms/SecondStageForm";
import ThirdStageForm from "./Forms/ThirdStageForm";
import FourthStageForm from "./Forms/FourthStageForm";

interface AdminPanelProps {
    currentStage: AppStage;
}

function AdminPanel({currentStage}: AdminPanelProps) {

    const appStageHandler = (currentStage: AppStage, stage: AppStage) => {
        if (currentStage === stage) {
            return 'active'
        } else if (currentStage >= stage) {
            return 'fulfilled'
        } else {
            return 'disabled'
        }
    }

    return (
        <div className='w-fit'>
            <CardTemplate>
                <div className='flex flex-row h-64'>
                    <div className='flex flex-col justify-center items-center gap-[21px] w-36 border-r border-r-[#DFDFDF]'>
                        <StageStatusBar status={appStageHandler(currentStage, 1)} text='1 етап'/>
                        <StageStatusBar status={appStageHandler(currentStage, 2)} text='2 етап'/>
                        <StageStatusBar status={appStageHandler(currentStage, 3)} text='3 етап'/>
                        <StageStatusBar status={appStageHandler(currentStage, 4)} text='4 етап'/>
                    </div>

                    {currentStage === 1 && <FirstStageForm/>}
                    {currentStage === 2 && <SecondStageForm/>}
                    {currentStage === 3 && <ThirdStageForm/>}
                    {currentStage === 4 && <FourthStageForm/>}
                </div>
            </CardTemplate>
        </div>
    )
}

export default AdminPanel;