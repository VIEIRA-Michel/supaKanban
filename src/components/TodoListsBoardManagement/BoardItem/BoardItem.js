import { useState } from 'react';
import './BoardItem.scss';
import { useSetRecoilState } from 'recoil';
import { todosState } from '../../../recoil';
import { Link } from 'react-router-dom';

function BoardItem({ name, id, kanbanIndex, editMode, kanban, moreThanOne }) {
    const [showButton, setShowButton] = useState(false);
    const [inputTitleValue, setInputTitleValue] = useState('');
    const setTodoListsState = useSetRecoilState(todosState);

    function removeTodoList() {
        setTodoListsState((oldTodoListsState) => {
            let state = JSON.parse(JSON.stringify(oldTodoListsState));
            state.map((list, i) => {
                if (i === kanbanIndex) {
                    state.splice(i, 1);
                }
                return list;
            })
            return state;
        });
    }


    function editTodoListTitle() {
        setTodoListsState((oldTodoListsState) => {
            let state = JSON.parse(JSON.stringify(oldTodoListsState));
            state.map((list, i) => {
                if (i === kanbanIndex) {
                    list.edit = !list.edit;
                } else {
                    list.edit = false;
                }
                return list;
            })
            return state;
        })
    }

    function submit(e) {
        if (e.key === "Enter") {
            if (inputTitleValue.length > 0) {
                setTodoListsState((oldTodoListsState) => {
                    let state = JSON.parse(JSON.stringify(oldTodoListsState));
                    state.map((list, i) => {
                        if (i === kanbanIndex) {
                            list.name = inputTitleValue;
                            list.edit = !list.edit;
                        } else {
                            list.edit = false;
                        }
                        return list;
                    })
                    return state;
                })
            }
        } else if (e.key === "Escape") {
            setTodoListsState((oldTodoListsState) => {
                let state = JSON.parse(JSON.stringify(oldTodoListsState));
                state.map((list, i) => {
                    if (i === kanbanIndex) {
                        list.edit = !list.edit;
                    } else {
                        list.edit = false;
                    }
                    return list;
                })

                setInputTitleValue(name);
                return state;
            });
        }
    }
    return (
        <div className={moreThanOne ? 'd-flex flex-row justify-content-sb flex-fill align-items-center multiple' : 'd-flex flex-row justify-content-sb flex-fill align-items-center'}>
            <div onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} className={showButton ? 'board__content__list__item d-flex align-items-center flex-fill showButton' : 'board__content__list__item d-flex flex-fill'}>
                <div className='board__content__list__item__title d-flex align-items-center'>
                    {editMode ? <input type='text' value={inputTitleValue} onChange={(e) => setInputTitleValue(e.target.value)} onKeyDown={(e) => submit(e)} /> : <span>{name}</span>}
                </div>
                {editMode ?
                    <button onClick={editTodoListTitle} className='cancel'>
                        <i className="fa-solid fa-xmark"></i>
                    </button> :
                    showButton ?
                        <div className='board__content__list__item__button'>
                            <i onClick={editTodoListTitle} className="fa-regular fa-pen-to-square"></i>
                            <i onClick={removeTodoList} className="fa-solid fa-trash"></i>
                        </div>
                        : ""
                }
            </div>
            <Link to={`/${id}`} state={{ name, id, kanbanIndex, kanban }} className='board__content__list__item__enter ml-15 h100 d-flex align-items-center'>Accéder</Link>
        </div>
    )
}

export default BoardItem;