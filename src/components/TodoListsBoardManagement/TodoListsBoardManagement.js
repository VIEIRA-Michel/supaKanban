import { useState } from 'react';
import './TodoListsBoardManagement.scss';
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
            <div className='top d-flex justify-content-center align-items-center'>
                <h2 className='mb-20'>Liste des tableaux</h2>
            </div>
            <div className="board d-flex flex-column">
                <div className='board__top d-flex flex-column flex-fill w100'>
                    <div className="board__top__button">
                        <button className='d-flex justify-content-sb align-items-center' onClick={() => setCreateMode(true)}><span>Créer un tableau</span><i className="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                {createMode && <div className='board__content__create d-flex align-items-center w100'>
                    <div className='board__content__create__input d-flex flex-row w100'>
                        <input type="text" className='d-flex flex-fill' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => submit(e)} />
                        <button className='board__content__create__cancel' onClick={() => setCreateMode(false)}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                </div>}
                {
                    todoLists.length > 0 ?
                        <div className='board__content__list d-flex flex-fill flex-column w100'>
                            {todoLists.map((element, index) =>
                                <BoardItem key={index} name={element.name} id={element.id} kanbanIndex={index} editMode={element.edit} kanban={element.kanban} moreThanOne={todoLists.length} />
                            )}
                        </div>
                        :
                        <div className="board__content__message d-flex justify-content-center">
                            Vous n’avez aucun tableau pour le moment
                        </div>
                }
            </div>
        </>
    )
}

export default TodoListsBoardManagement;