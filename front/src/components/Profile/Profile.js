import { useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePassword } from '../../apis/users';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil';
import { Navigate } from 'react-router-dom';

function Profile() {
    const userData = useRecoilValue(userState);
    const [showPwdForm, setShowPwdForm] = useState(false);
    const [showMsg, setShowMsg] = useState(null);
    const validationSchema = yup.object({
        oldPassword: yup
            .string()
            .required('Mot de passe actuel requis')
            .min(6, 'Mot de passe trop court !'),
        newPassword: yup
            .string()
            .required('Mot de passe requis')
            .min(6, 'Mot de passe trop court !'),
        confirmNewPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Les mots de passe ne correspondent pas')
    })

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
        clearErrors
    } = useForm({
        initialValues,
        resolver: yupResolver(validationSchema),
    });

    const submit = handleSubmit(async (pwd) => {
        try {
            clearErrors();
            const response = await changePassword(pwd);
            setShowPwdForm(!showPwdForm);
            setShowMsg(response);
            setTimeout(() => {
                setShowMsg(null)
            }, 1500);
        } catch (message) {
            setError('generic', { type: 'generic', message })
        }
    });

    return (
        <>
            {userData ?
                (
                    <>
                        <div className="max-[450px]:w-[90%] min-[451px]:w-[350px] m-10 bg-quaternary rounded-[40px] flex flex-col justify-center items-center p-5 shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]">
                            <div className={showMsg ? "bg-[#EFE8DF] p-2 rounded-[15px] w-full" : "hidden"}>
                                {showMsg && <p className="text-primary w-full flex flex-row justify-center items-center"><span className="mr-4">{showMsg}</span><i className="fa-thin fa-check"></i></p>}
                            </div>
                            <div className='flex flex-col flex-auto w-full'>
                                <div className="flex flex-col justify-center text-quinary items-center">
                                    <p className="font-bold">Nom d'utilisateur</p>
                                    <div className="w-full bg-white opacity-100 text-primary p-2 rounded-[15px] hover:opacity-80">
                                        <p>{userData && userData.username}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center text-quinary items-center mt-4">
                                    <p className="font-bold">Email</p>
                                    <div className="bg-white opacity-50 text-primary p-2 rounded-[15px] w-full cursor-not-allowed">
                                        <p>{userData && userData.local.email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center mt-4">
                                    <p className={`text-quinary font-bold ${showPwdForm ? "hidden" : "block"}`}>Mot de passe</p>
                                    {!showPwdForm ? <div onClick={() => setShowPwdForm(!showPwdForm)} className="bg-primary rounded-[15px] p-2 text-center cursor-pointer w-full opacity-80 hover:opacity-100 hover:transition-all">
                                        Modifier mon mot de passe
                                    </div> : <form onSubmit={submit} className="w-full">
                                        <div className="flex flex-col justify-center items-center mt-4">
                                            <label htmlFor="password" className='text-center text-quinary font-bold'>Mot de passe actuel</label>
                                            <input className="bg-white text-primary p-2 rounded-[15px] w-full" placeholder="Saisissez votre mot de passe" type="password" {...register('oldPassword')} />
                                            {errors.oldPassword && <p className='text-red-500'>{errors.oldPassword.message}</p>}
                                        </div>
                                        <div className="flex flex-col justify-center items-center mt-4">
                                            <label htmlFor="password" className='text-center text-quinary font-bold'>Nouveau mot de passe</label>
                                            <input className="bg-white text-primary p-2 rounded-[15px] w-full" type="password" placeholder="Doit contenir au moins 6 caractères" {...register('newPassword')} />
                                            {errors.newPassword && <p className='text-red-500'>{errors.newPassword.message}</p>}
                                        </div>
                                        <div className="flex flex-col justify-center items-center mt-4">
                                            <label htmlFor="password" className='text-center text-quinary font-bold'>Confirmer le mot de passe</label>
                                            <input className="bg-white text-primary p-2 rounded-[15px] w-full" type="password" placeholder="Confirmer le mot de passe" {...register('confirmNewPassword')} />
                                            {errors.confirmNewPassword && <p className='text-red-500'>{errors.confirmNewPassword.message}</p>}
                                        </div>
                                        {errors.generic && <p className='text-red-500'>{errors.generic.message}</p>}
                                        <button onClick={() => setShowPwdForm(!showPwdForm)} disabled={isSubmitting} className="bg-primary border border-[#130f40] rounded-[15px] p-2 text-[#EFE8DF] text-center cursor-pointer w-full mt-4 opacity-80 hover:opacity-100 hover:transition-all">
                                            Annuler la modification
                                        </button>
                                        <button type="submit" disabled={isSubmitting} className="bg-quinary text-primary rounded-[15px] p-2 text-center cursor-pointer w-full mt-4 opacity-80 hover:text-primary hover:opacity-100 hover:transition-all">
                                            Enregistrer le mot de passe
                                        </button>
                                    </form>}
                                </div>

                                <div>

                                </div>
                            </div>
                        </div>
                    </>

                ) : (
                    <Navigate to="/signin" />
                )}

        </>
    )
}

export default Profile;