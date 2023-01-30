import { useState } from 'react';
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
        <div className={moreThanOne ? 'flex flex-row justify-between flex-auto items-center mt-5' : 'flex flex-row justify-between flex-auto items-center'}>
            <div onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} className={showButton ? 'min-h-55 flex items-center flex-auto p-2.5 rounded-[20px] relative cursor-default bg-[#ffffffb3] transition-all' : 'min-h-55 p-2.5 bg-white rounded-[20px] cursor-default relative flex flex-auto'}>
                <div className='text-base text-[#3a4cae] font-thin truncate w-11/12 flex items-center'>
                    {editMode ? <input type='text' className='font-[Dosis] text-base font-thin border-none rounded-[10px] w-11/12' value={inputTitleValue} onChange={(e) => setInputTitleValue(e.target.value)} onKeyDown={(e) => submit(e)} /> : <span>{name}</span>}
                </div>
                {editMode ?
                    <button onClick={editTodoListTitle} className='border-none bg-transparent'>
                        <i className="fa-solid fa-xmark rounded-full py-2 px-2.5 cursor-pointer bg-white hover:text-white hover:bg-secondary hover:transition-all"></i>
                    </button> :
                    showButton ?
                        <div className='flex flex-row absolute bg-white top-[5px] right-[5px] p-[5px] cursor-pointer rounded-[15px] z-10 shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'>
                            <i onClick={editTodoListTitle} className="fa-regular fa-pen-to-square text-sm rounded-[10px] bg-white p-[7.5px] text-primary hover:bg-primary hover:text-white hover:transition-all"></i>
                            <i onClick={removeTodoList} className="fa-solid fa-trash text-sm rounded-[10px] bg-white p-[7.5px] text-primary hover:bg-primary hover:text-white hover:transition-all"></i>
                        </div>
                        : ""
                }
            </div>
            <Link to={`/${id}`} state={{ name, id, kanbanIndex, kanban }} className='ml-[15px] p-2.5 rounded-[15px] bg-primary text-white cursor-pointer opacity-80 hover:opacity-100 hover:transition-all min-h-55 no-underline h-full flex items-center'>Accéder</Link>
        </div>
    )
}

export default BoardItem;