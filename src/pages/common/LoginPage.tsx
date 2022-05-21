import React from 'react';
import CardTemplate from "../../components/complex/CardTemplate";
import Input from "../../components/basic/Input";
import Button from "../../components/basic/Button";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {

    const dispatch = useAppDispatch();
    const {isDataLoading} = useAppSelector(state => state.app)

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <ToastContainer/>
            <div className='w-96 h-fit'>
                <CardTemplate>
                    <div className='flex justify-center align-center'>
                        <div className='flex flex-col'>
                            <h1 className='flex text-xl font-light text-[#1A8A42] pt-5'>
                                Авторизація
                            </h1>
                            <form onSubmit={handleSubmit((data) => {})}
                                  className='flex flex-col gap-5 pt-5 pb-7'>
                                <div className='flex w-80 h-10'>
                                    <Input validationProps={register('email', {required: true})} isEmail={true}
                                           placeholder='Логін' styles={`${errors.email && 'border-red-300'}`}/>
                                </div>
                                <div className='flex w-80 h-10'>
                                    <Input validationProps={register('password', {required: true})} isPassword={true}
                                           placeholder='Пароль' styles={`${errors.password && 'border-red-300'}`}/>
                                </div>
                                <div className='flex w-80 h-10'>
                                    <Button isLoading={isDataLoading} isSubmit={true} label='Вхід'/>
                                </div>
                            </form>
                        </div>
                    </div>
                </CardTemplate>
            </div>
        </div>
    )
}

export default LoginPage
