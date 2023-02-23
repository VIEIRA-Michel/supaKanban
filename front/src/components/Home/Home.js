import pictureGroup from '../../assets/pictures/picture-group.webp'
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className='flex flex-row items-center w-[80%] h-[80%] justify-evenly'>
            <div className='w-[50%] h-full flex flex-col justify-evenly'>
                <div>
                    <div className='w-[70%] font-bold text-5xl text-quaternary'>Maîtriser un nouvel outil demande du temps.</div>
                    <div className='w-[70%] font-bold text-5xl text-primary text-[#FCBA06]'>Et si vous en gagniez ?</div>
                </div>
                <div className='font-bold text-quaternary w-[70%] font-medium text-2xl'>Gérer son espace de travail n'a jamais été aussi simple grâce à notre interface intuitive</div>
                <div>
                    <Link to={"/signup"} className='w-[280px] bg-primary p-4 rounded-[10px] flex items-center justify-evenly opacity-80 hover:opacity-100 transition-all'><span>Commencez à utiliser supakanban</span><i className="fa-duotone fa-chevron-right ml-2"></i></Link>
                </div>
            </div>
            <div className='w-[50%]'>
                <div className='bg-white p-2.5 rounded-full w-full h-full flex justify-end items-center'>
                    <img className='w-[70%] h-[70%] object-cover' src={pictureGroup} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home