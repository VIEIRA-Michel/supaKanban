import pictureGroup from '../../assets/pictures/picture-group.webp'
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil';
function Home() {
    const userData = useRecoilValue(userState);
    return (
        <>
            {
                userData ? (
                    <div className='max-[450px]:w-[100%] min-[451px]:w-[450px] h-[800px]' >
                        <div className='w-[90%] h-full flex flex-col justify-evenly m-auto'>
                            <div className='bg-quaternary rounded-[40px] h-[250px] shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]'>
                                <div className='h-full flex flex-col'>
                                    <div className='max-[375px]:text-base max-[414px]:text-lg  max-[414px]:text-center max-[414px]:m-auto h-[15%] flex justify-center items-center font-bold text-xl text-quinary'>Que souhaitez-vous faire ?</div>
                                    <div className='w-[70%] h-[80%] mx-auto flex flex-col justify-evenly'>
                                        <div className='flex flex-row justify-between items-center'><span className='text-white'>Accéder à mes notes</span><Link to={"/note"} className='w-[38px] h-[38px] bg-white text-quaternary flex justify-center items-center rounded-[10px] relative opacity-80 hover:opacity-100'><i className='fa-duotone fa-file-pen'></i></Link></div>
                                        <div className='flex flex-row justify-between items-center'><span className='text-white'>Accéder à mes kanbans</span><Link to={"/kanban"} className='w-[38px] h-[38px] bg-white text-quaternary flex justify-center items-center rounded-[10px] relative opacity-80 hover:opacity-100'><i className='fa-duotone fa-square-kanban'></i></Link></div>
                                        <div className='flex flex-row justify-between items-center'><span className='text-white'>Accéder à mon profil</span><Link to={"/profile"} className='w-[38px] h-[38px] bg-white text-quaternary flex justify-center items-center rounded-[10px] relative opacity-80 hover:opacity-100'><i className='fa-duotone fa-user'></i></Link></div>
                                        <div className='flex flex-row justify-between items-center'><span className='text-white'>Accéder à mes statistiques</span><Link to={"/stats"} className='w-[38px] h-[38px] bg-white text-quaternary flex justify-center items-center rounded-[10px] relative opacity-80 hover:opacity-100'><i className="fa-duotone fa-chart-simple"></i></Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className='flex flex-row items-center w-[80%] h-[90vh] justify-evenly'>
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
        </>
    )
}

export default Home