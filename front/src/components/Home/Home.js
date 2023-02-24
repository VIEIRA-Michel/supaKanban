import pictureGroup from '../../assets/pictures/picture-group.webp'
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil';
function Home() {
    const userData = useRecoilValue(userState);
    console.log(userData);
    return (
        <>
            {
                userData ? (
                    <div className='max-[450px]:w-[90%] min-[451px]:w-[350px] h-[540px]' >
                        <div className='w-[90%] h-full flex flex-row justify-evenly m-auto'>
                            <div className='w-[70%] h-full flex flex-col justify-evenly items-center'>
                                <div className='w-[90%] h-[40%] bg-tertiary rounded-[15px] shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]'>
                                    <div className="flex flex-col w-[85%] h-[32.5%] m-auto justify-evenly items-center">
                                        <span className='text-white'>Kanban crée</span>
                                        <div className="w-full text-center bg-white rounded-[10px] text-primary font-bold">
                                            {userData && userData.kanbanCreated}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-[85%] h-[32.5%] m-auto justify-evenly items-center">
                                        <span className='text-white'>Liste crée</span>
                                        <div className="w-full bg-white text-center rounded-[10px] text-primary font-bold">
                                            {userData && userData.listCreated}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-[85%] h-[32.5%] m-auto justify-evenly items-center">
                                        <span className='text-white'>Tâche crée</span>
                                        <div className="w-full bg-white text-center rounded-[10px] text-primary font-bold">
                                            {userData && userData.taskCreated}
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[90%] h-[30%] rounded-[15px] flex flex-row justify-between'>
                                    <div className='w-[47%] h-full bg-green-100 rounded-[15px]'></div>
                                    <div className='w-[47%] h-full flex flex-col justify-between items-center'>
                                        <div className='w-full h-[45%] bg-green-300 rounded-[15px]'></div>
                                        <div className='w-full h-[45%] bg-green-400 rounded-[15px]'></div>
                                    </div>
                                </div>
                                <div className='w-[90%] h-[20%] flex flex-col items-center justify-center bg-white rounded-[15px] shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]'>
                                    <div className='text-primary h-[20%] flex justify-center items-center'>
                                        <span className=''>
                                            Dernière connexion
                                        </span>
                                    </div>
                                    <div className='h-[60%] w-[85%] bg-secondary rounded-[10px] flex justify-center items-center'>
                                        <span className='text-lg text-white'>
                                            Ven 24 Févr 2023
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[28%] h-full flex flex-col justify-evenly items-center'>
                                <div className='bg-quinary rounded-[15px] shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]'>
                                    <div className='m-[10px] flex justify-center items-center opacity-80 hover:opacity-100'>
                                        <Link to={"/"} className='w-[38px] h-[38px] bg-white text-quaternary flex justify-center items-center rounded-[10px]'>
                                            <i class="fa-duotone fa-file-pen"></i>
                                        </Link>
                                    </div>
                                    <div className='m-[10px] flex justify-center items-center opacity-80 hover:opacity-100'>
                                        <Link to={"/"} className='w-[38px] h-[38px] bg-white text-quaternary flex justify-center items-center rounded-[10px]'>
                                            <i class="fa-duotone fa-paintbrush-pencil"></i>
                                        </Link>
                                    </div>
                                    <div className='m-[10px] flex justify-center items-center opacity-80 hover:opacity-100'>
                                        <Link to={"/board"} className='w-[38px] h-[38px] bg-white text-quaternary flex justify-center items-center rounded-[10px]'>
                                            <i class="fa-duotone fa-square-kanban"></i>
                                        </Link>
                                    </div>
                                </div>
                                {/* <div className='w-[80%]rounded-[15px]'>
                                    <div className='bg-white m-[10px] flex justify-center items-center rounded-[10px] opacity-80 hover:opacity-100 shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]'>
                                        <Link to={"/profile"} className='w-[40px] h-[38px] flex justify-center items-center'>
                                            <i class="fa-duotone fa-user text-primary"></i>
                                        </Link>
                                    </div>
                                    <div className='bg-secondary m-[10px] flex justify-center items-center rounded-[10px] opacity-80 hover:opacity-100 shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]'>
                                        <Link to={"/"} className='w-[40px] h-[38px] flex justify-center items-center'>
                                            <i class="fa-duotone fa-right-from-bracket text-white"></i>
                                        </Link>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                ) : (
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
        </>
    )
}

export default Home