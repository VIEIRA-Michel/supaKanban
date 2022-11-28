import { useState } from 'react';
import './BoardItem.scss';
import { useSetRecoilState } from 'recoil';
import { todoListsState } from '../../../recoil';

function BoardItem({ name, id, index, editMode }) {
    const [showButton, setShowButton] = useState(false);
    const [inputTitleValue, setInputTitleValue] = useState('');
    const setTodoListsState = useSetRecoilState(todoListsState);

    function removeTodoList() {
        setTodoListsState((oldTodoListsState) => {
            let state = JSON.parse(JSON.stringify(oldTodoListsState));
            state.map((list, i) => {
                if (i === index) {
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
                if (i === index) {
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
                        if (i === index) {
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
                    if (i === index) {
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
        <div className='d-flex flex-row justify-content-sb flex-fill align-items-center m-10'>
            <div onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} className={showButton ? 'board__content__list__item d-flex flex-fill showButton' : 'board__content__list__item d-flex flex-fill'}>
                <div className='board__content__list__item__title'>
                    {editMode ? <input type='text' value={inputTitleValue} onChange={(e) => setInputTitleValue(e.target.value)} onKeyDown={(e) => submit(e)} /> : <span>{name}</span>}
                </div>
                {showButton &&
                    <div className='board__content__list__item__button'>
                        <i onClick={editTodoListTitle} className="fa-regular fa-pen-to-square"></i>
                        <i onClick={removeTodoList} className="fa-solid fa-trash"></i>
                    </div>
                }
            </div>
            <div className='board__content__list__item__enter ml-15 h100 d-flex align-items-center'>
                Accéder
            </div>
        </div>
    )
}

export default BoardItem;