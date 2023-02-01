import { Link } from 'react-router-dom';

function LoginForm() {
    return (
        <div className='h-full w-[350px] m-auto rounded-[40px] shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'>
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
            </form>
            <div className='flex flex-col justify-center items-center text-secondary'>
                Vous n'avez pas encore de compte ?
                <Link to='/signup' className='text-secondary font-bold mb-5 cursor-pointer hover:underline'>Inscrivez-vous gratuitement</Link>
            </div>
        </div>
    )
}

export default LoginForm;