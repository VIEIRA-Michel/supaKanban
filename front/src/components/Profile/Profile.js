import { useContext, useState } from "react";
import { AuthContext } from '../../context';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePassword } from '../../apis/users';


function Profile() {
    const { user } = useContext(AuthContext);
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
            <div className="max-[450px]:w-[90%] min-[451px]:w-[350px] m-10 bg-[#777591] rounded-[40px] flex flex-col justify-center items-center p-5 shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]">
                <div className={showMsg ? "bg-[#EFE8DF] p-2 rounded-[15px] w-full" : "hidden"}>
                    {showMsg && <p className="text-primary w-full flex flex-row justify-center items-center"><span className="mr-4">{showMsg}</span><i className="fa-thin fa-check"></i></p>}
                </div>
                <div className='flex flex-col flex-auto w-full'>
                    <div className="flex flex-col justify-center text-white text-center">
                        <div className="flex flex-row justify-evenly max-[374px]:flex-col ">
                            <div className="flex flex-col w-[30%] max-[374px]:w-full">
                                <p>Kanban crée</p>
                                <div className="bg-white rounded-[15px] text-primary py-2.5 font-bold">
                                    {user && user.kanbanCreated}
                                </div>
                            </div>
                            <div className="flex flex-col w-[30%] max-[374px]:w-full max-[374px]:mt-4">
                                <p>Liste crée</p>
                                <div className="bg-white rounded-[15px] text-primary py-2.5 font-bold">
                                    {user && user.listCreated}
                                </div>
                            </div>
                            <div className="flex flex-col w-[30%] max-[374px]:w-full max-[374px]:mt-4">
                                <p>Tâche crée</p>
                                <div className="bg-white rounded-[15px] text-primary py-2.5 font-bold">
                                    {user && user.taskCreated}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <p>Email</p>
                        <div className="bg-white opacity-50 text-primary p-2 rounded-[15px] w-full cursor-not-allowed">
                            {user && user.email}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <p className={showPwdForm ? "hidden" : "block"}>Mot de passe</p>
                        {!showPwdForm ? <div onClick={() => setShowPwdForm(!showPwdForm)} className="bg-primary rounded-[15px] p-2 text-center cursor-pointer w-full opacity-80 hover:opacity-100 hover:transition-all">
                            Modifier mon mot de passe
                        </div> : <form onSubmit={submit} className="w-full">
                            <div className="flex flex-col justify-center items-center mt-4">
                                <label htmlFor="password" className='text-center text-white'>Mot de passe actuel</label>
                                <input className="bg-white text-primary p-2 rounded-[15px] w-full" placeholder="Saisissez votre mot de passe" type="password" {...register('oldPassword')} />
                                {errors.oldPassword && <p className='text-red-500'>{errors.oldPassword.message}</p>}
                            </div>
                            <div className="flex flex-col justify-center items-center mt-4">
                                <label htmlFor="password" className='text-center text-white'>Nouveau mot de passe</label>
                                <input className="bg-white text-primary p-2 rounded-[15px] w-full" type="password" placeholder="Doit contenir au moins 6 caractères" {...register('newPassword')} />
                                {errors.newPassword && <p className='text-red-500'>{errors.newPassword.message}</p>}
                            </div>
                            <div className="flex flex-col justify-center items-center mt-4">
                                <label htmlFor="password" className='text-center text-white'>Confirmer le mot de passe</label>
                                <input className="bg-white text-primary p-2 rounded-[15px] w-full" type="password" placeholder="Confirmer le mot de passe" {...register('confirmNewPassword')} />
                                {errors.confirmNewPassword && <p className='text-red-500'>{errors.confirmNewPassword.message}</p>}
                            </div>
                            {errors.generic && <p className='text-red-500'>{errors.generic.message}</p>}
                            <button onClick={() => setShowPwdForm(!showPwdForm)} disabled={isSubmitting} className="bg-primary border border-[#130f40] rounded-[15px] p-2 text-[#EFE8DF] text-center cursor-pointer w-full mt-4 opacity-80 hover:opacity-100 hover:transition-all">
                                Annuler la modification
                            </button>
                            <button type="submit" disabled={isSubmitting} className="rounded-[15px] border border-[#EFE8DF] p-2 text-center cursor-pointer w-full mt-4 opacity-80 hover:bg-[#EFE8DF] hover:text-primary hover:opacity-100 hover:transition-all">
                                Enregistrer le mot de passe
                            </button>
                        </form>}
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;