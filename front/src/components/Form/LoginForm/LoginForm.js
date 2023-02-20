import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

function LoginForm() {
    const { login, user } = useContext(AuthContext);

    const validationSchema = yup.object({
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

    const submit = handleSubmit(async (credentials) => {
        try {
            clearErrors();
            await login(credentials);
        } catch ({ message }) {
            console.log(message);
            setError('generic', { type: 'generic', message })
        }
    });
    return (
        <>
            {user ? (
                <Navigate to="/board" />
            ) : (
                <div className='max-[450px]:w-[90%] min-[451px]:w-[350px] m-auto rounded-[40px] shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'>
                    <form onSubmit={submit} className="flex flex-col w-[85%] m-auto">
                        <div className="flex flex-col mt-5">
                            <label htmlFor="email" className='text-center text-secondary'>email</label>
                            <input type="email" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="email" id="email" {...register('email')} />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="password" className='text-center text-secondary'>mot de passe</label>
                            <input type="password" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="password" id="password" {...register('password')} />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        </div>
                        {errors.generic && <p className='text-red-500'>{errors.generic.message}</p>}
                        <div className='my-10 w-full'>
                            <button disabled={isSubmitting} type="submit" className='w-full rounded-[15px] p-[15px] bg-secondary opacity-80 hover:opacity-100  hover:text-white hover:transition-all'>Se connecter</button>
                        </div>
                    </form>
                    <div className='flex flex-col justify-center items-center text-secondary'>
                        Vous n'avez pas encore de compte ?
                        <Link to='/signup' className='text-secondary font-bold mb-5 cursor-pointer hover:underline'>Inscrivez-vous gratuitement</Link>
                    </div>
                </div>
            )}
        </>

    )
}

export default LoginForm;