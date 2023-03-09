import { Link, useLocation, Navigate } from 'react-router-dom';
import { userState } from '../../recoil';
import { useRecoilValue } from 'recoil';

function Statistics() {
    const userData = useRecoilValue(userState);
    return (
        <>
            {userData ?
                (
                    <>
                        <div className='max-[450px]:w-[90%] min-[451px]:w-[350px] h-[500px] m-10 flex flex-col justify-evenly items-center'>
                            <div className='w-full h-full bg-quaternary flex flex-col justify-evenly items-center rounded-[40px] shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]'>
                                <div className="flex flex-col w-[85%] justify-between items-center m-4">
                                    <span className='text-quinary font-bold'>Nombre de kanbans créer</span>
                                    <div className="w-full text-center bg-white p-2 font-dosis rounded-[15px] text-primary">
                                        {userData && userData.kanbanCreated}
                                    </div>
                                    <div>
                                        <p>Dernier kanban crée le : 25 mars 2021 </p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[85%] justify-between items-center m-4">
                                    <span className='text-quinary font-bold'>Nombre de listes créer</span>
                                    <div className="w-full bg-white text-center p-2 font-dosis rounded-[15px] text-primary">
                                        {userData && userData.listCreated}
                                    </div>
                                    <div>
                                        <p>Dernière liste crée le : 25 mars 2021 </p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[85%] justify-between items-center m-4">
                                    <span className='text-quinary font-bold'>Nombre de tâches créer</span>
                                    <div className="w-full bg-white text-center p-2 fofont-dosis rounded-[15px] text-primary">
                                        {userData && userData.taskCreated}
                                    </div>
                                    <div>
                                        <p>Dernière tâche crée le : 25 mars 2021 </p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[85%] justify-between items-center m-4">
                                    <span className='text-quinary font-bold'>Nombre de notes créer</span>
                                    <div className="w-full bg-white text-center p-2 font-dosis rounded-[15px] text-primary">
                                        {userData && userData.taskCreated}
                                    </div>
                                    <div>
                                        <p>Dernière note crée le : 25 mars 2021 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

                ) : (
                    <Navigate to="/signin" />
                )}

        </>
    )
}

export default Statistics;