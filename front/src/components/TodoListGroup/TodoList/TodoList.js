import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todosState } from '../../../recoil';
import TodoItem from "./TodoItem/TodoItem";
import './TodoList.scss';
import AddTodo from './AddTodo/AddTodo';

function TodoList({ section, listId, index, kanbanIndex, kanbanId }) {
    const setTodosState = useSetRecoilState(todosState);
    const [inputValue, setInputValue] = useState('');
    const [inputTitleValue, setInputTitleValue] = useState(section.title);
    const [showAddTodo, setShowAddTodo] = useState(false);

    function handleInputValue(content) {
        setInputValue(content)
    }

    function showInput(value) {
        setShowAddTodo(value);
    }

    function toggleListMenu() {
        setTodosState((oldTodosState) => {
            let state = JSON.parse(JSON.stringify(oldTodosState));
            state.map((element, i) => {
                if (i === kanbanIndex) {
                    element.kanban.map((list, listIndex) => {
                        if (listIndex === index) {
                            list.menu = !list.menu;
                        } else {
                            list.menu = false;
                        }
                        return list;
                    });
                }
                return element;
            })
            return state;
        });
    }

    function editListTitle() {
        setTodosState((oldTodosState) => {
            let state = JSON.parse(JSON.stringify(oldTodosState));
            state.map((element, i) => {
                if (i === kanbanIndex) {
                    element.kanban.map((list, listIndex) => {
                        if (listIndex === index) {
                            list.edit = !list.edit;
                        } else {
                            list.edit = false;
                        }
                        return list;
                    });
                }
                return element;
            })
            return state;
        })
        toggleListMenu();
    }

    function submit(e) {
        if (e.key === "Enter") {
            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state.map((element, i) => {
                    if (i === kanbanIndex) {
                        element.kanban.map((list) => {
                            if (list.id === listId) {
                                list.title = inputTitleValue;
                                list.edit = false;
                            } else {
                                list.edit = false;
                            }
                            return list;
                        });
                    }
                    return element;
                })
                return state;
            });
        } else if (e.key === "Escape") {
            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state.map((element, i) => {
                    if (i === kanbanIndex) {
                        element.kanban.map((list) => {
                            if (list.id === listId) {
                                list.edit = false;
                            }
                            return list;
                        });
                    }
                    return element;
                })
                return state;
            });
        }
    }

    function removeList() {
        setTodosState((oldTodosState) => {
            let state = JSON.parse(JSON.stringify(oldTodosState));
            state.map((element, i) => {
                if (i === kanbanIndex) {
                    element.kanban.splice(index, 1)
                }
                return element;
            })
            return state;
        });
    }

    return (
        <div className='m-20 kanban'>
            <div className='kanban__top'>
                <div className="kanban__top__title">
                    {section.edit ? <input value={inputTitleValue} onChange={(e) => setInputTitleValue(e.target.value)} onKeyDown={(e) => submit(e)} type="text" /> : <span>{section.title}</span>}
                </div>
                {section.edit ? (<div className="kanban__top__cancel">
                    <i onClick={editListTitle} className="fa-solid fa-xmark"></i>
                </div>) : (<div className="kanban__top__more">
                    <i onClick={toggleListMenu} className="fa-solid fa-ellipsis"></i>
                </div>)}
                {section.menu && (<div className='kanban__top__button'>
                    <button onClick={editListTitle} ><i className="fa-regular fa-pen-to-square"></i></button>
                    <button onClick={removeList}><i className="fa-solid fa-trash"></i></button>
                </div>)}
            </div>
            <div className='kanban__section'>
                <div className="kanban__section__button d-flex align-items-center">
                    {showAddTodo ? <>
                        <AddTodo id={section.id} value={inputValue} onChange={handleInputValue} showInput={showInput} index={index} kanbanIndex={kanbanIndex} listId={listId} />
                        <button onClick={() => setShowAddTodo(false)} className='cancelInput'><i className="fa-solid fa-xmark"></i></button>
                    </>
                        : <button className='d-flex justify-content-center align-items-center flex-fill' onClick={() => showInput(true)}><span>Ajoutez une tâche</span><i className="fa-solid fa-plus"></i></button>}
                </div>
                <div className="kanban__section__content">
                    <Droppable key={section.id} droppableId={section.id}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                className='kanban__section__content__list'
                                ref={provided.innerRef}
                            >
                                {
                                    section.tasks.map((task, index) => (
                                        <Draggable
                                            key={task.id}
                                            draggableId={task.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        opacity: snapshot.isDragging ? '0.5' : '1'
                                                    }}
                                                    className="kanban__section__content__list__item"
                                                >
                                                    <TodoItem todo={task} kanbanId={kanbanId}>
                                                    </TodoItem>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </div>

    )
}

export default TodoList;