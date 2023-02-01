import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
function AuthView() {
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
        name: '',
        email: '',
        password: ''
    }

    const [hasAccount, setHasAccount] = useState(true);
    const { handleSubmit, register, formState: { errors } } = useForm({
        initialValues,
        resolver: yupResolver(validationSchema),
    });

    const submit = handleSubmit((credentials) => {
        console.log(credentials);
    });
    return (
        <div className='h-full w-[350px] m-auto rounded-[40px] shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'>
            <h1>{hasAccount ? 'Connexion' : 'Inscription'}</h1>
            {hasAccount ?
                <form className="flex flex-col max-w-[300px] m-auto">
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email" className='text-center text-secondary'>Email</label>
                        <input type="email" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="email" id="email" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="password" className='text-center text-secondary'>Mot de passe</label>
                        <input type="password" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="password" id="password" />
                    </div>
                    <div className='my-10 w-full'>
                        <button type="submit" className='w-full rounded-[15px] p-[15px] bg-secondary opacity-80 hover:opacity-100  hover:text-white hover:transition-all'>Se connecter</button>
                    </div>
                </form> :
                <form onSubmit={submit} className="flex flex-col max-w-[300px] m-auto">
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email" className='text-center text-secondary'>Nom d'utilisateur</label>
                        <input type="text" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="email" id="email" {...register('username')} />
                        {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email" className='text-center text-secondary'>Email</label>
                        <input type="text" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="email" id="email" {...register('email')} />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="password" className='text-center text-secondary'>Mot de passe</label>
                        <input type="password" className='rounded-[15px] p-[5px] text-secondary border-[transparent]' name="password" id="password" {...register('password')} />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    {errors.generic && <p className='text-red-500'>{errors.generic.message}</p>}
                    <div className='my-10 w-full'>
                        <button type="submit" className='w-full rounded-[15px] p-[15px] bg-secondary opacity-80 hover:opacity-100  hover:text-white hover:transition-all'>S'inscrire</button>
                    </div>
                </form>
            }
            {
                hasAccount ? <div className='flex flex-col justify-center items-center text-secondary'>
                    Vous n'avez pas encore de compte ?
                    <span onClick={() => setHasAccount(!hasAccount)} className='text-secondary font-bold mb-5 cursor-pointer hover:underline'>Inscrivez-vous gratuitement</span>
                </div> : <div className='flex flex-col justify-center items-center text-secondary'>
                    Vous avez déjà un compte ?
                    <span onClick={() => setHasAccount(!hasAccount)} className='text-secondary font-bold mb-5 cursor-pointer hover:underline'>Connectez-vous</span>
                </div>
            }
        </div>
    )
}

export default AuthView;