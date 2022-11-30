import './TodoItem.scss';
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
        console.log(e.key)
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
        <div onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)} className={showButton ? "card showButton" : "card"}>
            <div className="card__title">
                {todo.edit ? <textarea value={inputTaskTitle} onChange={(e) => autoResize(e)} type="text" onKeyDown={(e) => submit(e)} /> : todo.content}
            </div>
            {showButton && !todo.edit ?
                <div className='card__button'>
                    <i onClick={editTaskTitle} className="fa-regular fa-pen-to-square"></i>
                    <i onClick={removeTask} className="fa-solid fa-trash"></i>
                </div>

                : !showButton && !todo.edit ? '' :
                    <div className='card__cancel'>
                        <i onClick={editTaskTitle} className="fa-solid fa-xmark"></i>
                    </div>
            }
        </div>
    )
}

export default TodoItem;