import { Navigate } from 'react-router-dom';
import { userState } from '../../recoil';
import { useRecoilValue } from 'recoil';

function Statistics() {
    const userData = useRecoilValue(userState);

    function formatDate(string) {
        const date = string.split('T')[0].split('-');
        const event = new Date(Date.UTC(date[0], date[1], date[2]));
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const returnDate = event.toLocaleDateString("fr-FR", options);
        return returnDate;
    }

    const lastKanbanCreated = userData.lastKanbanCreated ? formatDate(userData.lastKanbanCreated) : '/';
    const lastListCreated = userData.lastListCreated ? formatDate(userData.lastListCreated) : '/';
    const lastTaskCreated = userData.lastTaskCreated ? formatDate(userData.lastTaskCreated) : '/';
    const lastNoteCreated = userData.lastNoteCreated ? formatDate(userData.lastNoteCreated) : '/';

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
                                        <p>Dernier kanban crée le : <span className='text-primary font-bold'>{lastKanbanCreated}</span></p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[85%] justify-between items-center m-4">
                                    <span className='text-quinary font-bold'>Nombre de listes créer</span>
                                    <div className="w-full bg-white text-center p-2 font-dosis rounded-[15px] text-primary">
                                        {userData && userData.listCreated}
                                    </div>
                                    <div>
                                        <p>Dernière liste crée le : <span className='text-primary font-bold'>{lastListCreated}</span></p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[85%] justify-between items-center m-4">
                                    <span className='text-quinary font-bold'>Nombre de tâches créer</span>
                                    <div className="w-full bg-white text-center p-2 fofont-dosis rounded-[15px] text-primary">
                                        {userData && userData.taskCreated}
                                    </div>
                                    <div>
                                        <p>Dernière tâche crée le : <span className='text-primary font-bold'>{lastTaskCreated}</span></p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[85%] justify-between items-center m-4">
                                    <span className='text-quinary font-bold'>Nombre de notes créer</span>
                                    <div className="w-full bg-white text-center p-2 font-dosis rounded-[15px] text-primary">
                                        {userData && userData.noteCreated}
                                    </div>
                                    <div>
                                        <p className=''>Dernière note crée le : <span className='text-primary font-bold'>{lastNoteCreated}</span></p>
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