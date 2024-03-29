import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom';
import { useUserActions } from '../../../actions';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil';

function LoginForm() {
    const userData = useRecoilValue(userState);
    const useUser = useUserActions();

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
            await useUser.login(credentials);
        } catch ({ message }) {
            setError('generic', { type: 'generic', message })
        }
    });
    return (
        <div className='h-[90vh] w-full flex justify-center items-center'>
            {
                userData ? (
                    <Navigate to="/" />
                ) : (
                    <div className='max-[450px]:w-[90%] min-[451px]:w-[350px] m-auto rounded-[40px] bg-quaternary shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'>
                        <form onSubmit={submit} className="flex flex-col w-[85%] m-auto">
                            <div className="flex flex-col mt-5">
                                <label htmlFor="email" className='text-center text-quinary font-bold'>Email</label>
                                <input type="email" className='rounded-[15px] p-[5px] text-primary border-[transparent] bg-white py-2 px-2.5 outline-0' name="email" id="email" {...register('email')} />
                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col mt-5">
                                <label htmlFor="password" className='text-center text-quinary font-bold'>Mot de passe</label>
                                <input type="password" className='rounded-[15px] p-[5px] text-primary border-[transparent] bg-white py-2 px-2.5 outline-0' name="password" id="password" {...register('password')} />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                            </div>
                            {errors.generic && <p className='text-red-500'>{errors.generic.message}</p>}
                            <div className='my-10 w-full'>
                                <button disabled={isSubmitting} type="submit" className='w-full rounded-[15px] p-[15px] bg-secondary opacity-80 hover:opacity-100  hover:text-white hover:transition-all'>Se connecter</button>
                            </div>
                        </form>
                        <div className='flex flex-col justify-center items-center text-white'>
                            Vous n'avez pas encore de compte ?
                            <Link to='/signup' className='text-quinary font-bold mb-5 cursor-pointer hover:underline'>Inscrivez-vous gratuitement</Link>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default LoginForm;