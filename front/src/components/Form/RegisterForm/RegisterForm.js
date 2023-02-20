import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUser } from '../../../apis/users';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';


function RegisterForm() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const validationSchema = yup.object({
        username: yup
            .string()
            .required("Nom d'utilisateur requis")
            .min(4, "Nom d'utilisateur trop court !"),
        email: yup
            .string()
            .required('Email requis')
            .min(10, "L'email n'est pas valide"),
        password: yup
            .string()
            .required('Mot de passe requis')
            .min(6, 'Mot de passe trop court !'),
    })

    const initialValues = {
        username: '',
        email: '',
        password: ''
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

    const submit = handleSubmit(async (user) => {
        try {
            clearErrors();
            await createUser(user);
            navigate('/signin');
        } catch ({ message }) {
            setError('generic', { type: 'generic', message })
        }
    });

    return (
        <>
            {user ? (
                <Navigate to="/board" />
            ) : (<div className="max-[450px]:w-[90%] min-[451px]:w-[350px] m-auto rounded-[40px] shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]">
                <form onSubmit={submit} className="flex flex-col w-[85%] m-auto">
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email" className='text-center text-secondary'>nom d'utilisateur</label>
                        <input type="text" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="email" id="username" {...register('username')} />
                        {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email" className='text-center text-secondary'>email</label>
                        <input type="text" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="email" id="email" {...register('email')} />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="password" className='text-center text-secondary'>mot de passe</label>
                        <input type="password" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="password" id="password" {...register('password')} />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    {errors.generic && <p className='text-red-500'>{errors.generic.message}</p>}
                    <div className='my-10 w-full'>
                        <button disabled={isSubmitting} type="submit" className='w-full rounded-[15px] p-[15px] bg-secondary opacity-80 hover:opacity-100  hover:text-white hover:transition-all'>S'inscrire</button>
                    </div>
                </form>
                <div className='flex flex-col justify-center items-center text-secondary'>
                    Vous avez déjà un compte ?
                    <Link to='/signin' className='text-secondary font-bold mb-5 cursor-pointer hover:underline'>Connectez-vous</Link>
                </div>
            </div>
            )}
        </>

    )
}

export default RegisterForm;