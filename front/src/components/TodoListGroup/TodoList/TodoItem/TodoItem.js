import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todosState } from '../../../../recoil';

function TodoItem({ todo, kanbanId }) {
    const setTodosState = useSetRecoilState(todosState);
    const [showButton, setShowButton] = useState(false);
    const [inputTaskTitle, setInputTaskTitle] = useState(todo.content);

    function autoResize(e) {
        setInputTaskTitle(e.target.value)
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    function editTaskTitle() {
        setTodosState((oldTodosState) => {
            let state = JSON.parse(JSON.stringify(oldTodosState));
            state.map((table => {
                if (table.id === kanbanId) {
                    table.kanban.map((list) => {
                        if (list.id === todo.listId) {
                            list.tasks.map((task, i) => {
                                if (task.id === todo.id) {
                                    setInputTaskTitle(todo.content);
                                    task.edit = !task.edit;
                                } else {
                                    task.edit = false;
                                }
                                return task;
                            })
                        }
                        return list;
                    })
                }
                return table;
            }))
            return state;
        });
    }

    function removeTask() {
        setTodosState((oldTodosState) => {
            let state = JSON.parse(JSON.stringify(oldTodosState));
            state.map((table => {
                if (table.id === kanbanId) {
                    table.kanban.map((list) => {
                        if (list.id === todo.listId) {
                            list.tasks.map((task, i) => {
                                if (task.id === todo.id) {
                                    list.tasks.splice(i, 1);
                                }
                                return task;
                            })
                        }
                        return list;
                    })
                }
                return table;
            }))
            return state;
        });
    }

    function submit(e) {
        if (e.key === "Enter") {
            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state.map((table => {
                    if (table.id === kanbanId) {
                        table.kanban.map((list) => {
                            if (list.id === todo.listId) {
                                list.tasks.map((task, i) => {
                                    if (task.id === todo.id) {
                                        task.content = inputTaskTitle;
                                        task.edit = !task.edit;
                                    } else {
                                        task.edit = false;
                                    }
                                    return task;
                                })
                            }
                            return list;
                        })
                    }
                    return table;
                }))
                return state;
            });
        } else if (e.key === "Escape") {
            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state.map((table => {
                    if (table.id === kanbanId) {
                        table.kanban.map((list) => {
                            if (list.id === todo.listId) {
                                list.tasks.map((task, i) => {
                                    if (task.id === todo.id) {
                                        task.edit = !task.edit;
                                    } else {
                                        task.edit = false;
                                    }
                                    return task;
                                })
                            }
                            return list;
                        })
                    }
                    return table;
                }))
                setInputTaskTitle(todo.content);
                return state;
            });
        }
    }

    return (
        <div onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} className={showButton ? "min-h-[60px] p-[10px] rounded-[20px] text-secondary text-[22px] mt-[15px] break-words flex flex-row justify-around relative items-center bg-[#ffffffb3] transition-all" : "min-h-[60px] p-[10px] rounded-[20px] text-secondary text-[22px] mt-[15px] break-words flex flex-row justify-around relative items-center bg-white"}>
            <div className="w-[90%] text-base">
                {todo.edit ? <textarea value={inputTaskTitle} onChange={(e) => autoResize(e)} type="text" onKeyDown={(e) => submit(e)} className="flex flex-auto w-[95%] text-base resize-none px-[5px] focus:outline-none rounded-[10px]" /> : todo.content}
            </div>
            {showButton && !todo.edit ?
                <div className='flex flex-row absolute bg-white right-[5px] top-[5px] z-[2] p-[5px] cursor-pointer rounded-[15px] shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'>
                    <i onClick={editTaskTitle} className="fa-regular fa-pen-to-square text-sm rounded-[10px] bg-white p-[10px] hover:bg-primary hover:text-white hover:transition-all"></i>
                    <i onClick={removeTask} className="fa-solid fa-trash text-sm rounded-[10px] bg-white p-[10px] hover:bg-primary hover:text-white hover:transition-all"></i>
                </div>

                : !showButton && !todo.edit ? '' :
                    <button onClick={editTaskTitle} className='cursor-pointer border-none bg-transparent'>
                        <i className="fa-solid fa-xmark bg-white text-sm leading-3 py-2 px-2.5 rounded-full hover:bg-primary hover:text-white hover:transition-all"></i>
                    </button>
            }
        </div>
    )
}

export default TodoItem;