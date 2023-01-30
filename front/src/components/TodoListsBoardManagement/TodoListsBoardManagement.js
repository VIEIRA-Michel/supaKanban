import { useState } from 'react';
import BoardItem from './BoardItem/BoardItem';
import { todosState } from '../../recoil';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

function TodoListsBoardManagement() {
    const [createMode, setCreateMode] = useState(false);
    // const [todoLists, setTodoLists] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [todoLists, setTodoListsState] = useRecoilState(todosState);
    function submit(e) {
        if (e.key === "Enter") {
            if (inputValue.length > 0) {
                setTodoListsState((oldTodoListsState) => {
                    let state = JSON.parse(JSON.stringify(oldTodoListsState));
                    state.unshift({ id: uuidv4(), name: inputValue, edit: false, kanban: [] });
                    setCreateMode(false);
                    setInputValue('');
                    return state;
                })
            }
        }
    }

    return (
        <>
            <div className='h-1/5 flex justify-center items-center'>
                <h2 className='mb-5'>Liste des tableaux</h2>
            </div>
            <div className="min-w-310 bg-[#777591] rounded-[40px] flex flex-col justify-center items-center p-5 shadow-[0_2px_18px_0_rgba(0,0,0,0.5)]">
                <div className='flex flex-col flex-auto w-full'>
                    <div className="flex justify-center text-white">
                        <button className='w-full text-white flex justify-between items-center cursor-pointer rounded-[15px] py-2.5 px-5 bg-[#130f40] border-none opacity-80 hover:opacity-100 transition-all' onClick={() => setCreateMode(true)}><span className='mr-1.5'>Créer un tableau</span><i className="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                {createMode && <div className='flex items-center w-full'>
                    <div className='flex flex-row w-full mt-5'>
                        <input type="text" className='flex flex-auto font-[Dosis] text-base rounded-[15px] border-none p-2.5 text-black' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => submit(e)} />
                        <button className='border-none bg-transparent ml-2.5' onClick={() => setCreateMode(false)}><i className="fa-solid fa-xmark py-2 px-2.5 bg-[#130f40] text-white rounded-full cursor-pointer opacity-80 hover:opacity-100 transition-all"></i></button>
                    </div>
                </div>}
                {
                    todoLists.length > 0 ?
                        <div className='flex flex-auto flex-col w-full'>
                            {todoLists.map((element, index) =>
                                <BoardItem key={index} name={element.name} id={element.id} kanbanIndex={index} editMode={element.edit} kanban={element.kanban} moreThanOne={todoLists.length} />
                            )}
                        </div>
                        :
                        <div className="flex justify-center text-white m-2.5">
                            Vous n’avez aucun tableau pour le moment
                        </div>
                }
            </div>
        </>
    )
}

export default TodoListsBoardManagement;