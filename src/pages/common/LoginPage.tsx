import React, {useState} from 'react';
import CardTemplate from "../../components/complex/CardTemplate";
import Input from "../../components/basic/Input";
import Button from "../../components/basic/Button";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {

    let navigate = useNavigate();
    const {isUserAuthorized, userRole} = useAppSelector(state => state.app)
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            login: '',
            password: ''
        }
    });

    const logIn = async (data: { login: string; password: string }) => {
        try {
            setIsLoading(true)
            toast.success('Успіх')
            setIsLoading(false)
        } catch (err) {
            toast.error('Помилка')
            setIsLoading(false)
        }
    }

    const authHandler = () => {
        if (isUserAuthorized) {
            switch (userRole) {
                case 'student':
                    navigate('/student')
                    break
                case 'lecturer':
                    navigate('/lecturer')
                    break
                case 'admin':
                    navigate('/admin')
                    break
                default:
                    navigate('')
                    break
            }
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <ToastContainer />
            <div className='w-96 h-fit'>
                <CardTemplate>
                    <div className='flex justify-center align-center'>
                        <div className='flex flex-col'>
                            <h1 className='flex text-xl font-light text-[#1A8A42] pt-5'>
                                Авторизація
                            </h1>
                            <form onSubmit={handleSubmit((data) => signUp(data))}
                                  className='flex flex-col gap-5 pt-5 pb-7'>
                                <div className='flex w-80 h-10'>
                                    <Input validationProps={register('login', {required: true})} isEmail={true}
                                           placeholder='Логін' styles={`${errors.login && 'border-red-300'}`}/>
                                </div>
                                <div className='flex w-80 h-10'>
                                    <Input validationProps={register('password', {required: true})} isPassword={true}
                                           placeholder='Пароль' styles={`${errors.password && 'border-red-300'}`}/>
                                </div>
                                <div className='flex w-80 h-10'>
                                    <Button isLoading={isLoading} onClick={authHandler} isSubmit={true} label='Вхід'/>
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
