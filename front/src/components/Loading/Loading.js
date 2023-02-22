import logo from '../../assets/pictures/logo-supakanban.svg';

function Loading() {
    return (
        <div className="bg-primary flex justify-center items-center relative w-[100vw] h-[100vh]">
            <img className='w-[200px] h-[200px] animate-bounce' src={logo} alt="" />
        </div>
    )
}

export default Loading;