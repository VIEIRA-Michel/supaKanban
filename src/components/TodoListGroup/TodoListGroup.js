import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todosState } from '../../recoil';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import TodoList from './TodoList/TodoList';
import './TodoListGroup.scss';


function TodoListGroup() {
    const [todos, setTodosState] = useRecoilState(todosState);
    const [input, setInput] = useState('');
    const [showInput, setShowInput] = useState(false);
    let location = useLocation();

    function onDragEnd(result) {
        if (!result.destination) return
        const { source, destination } = result
        if (source.droppableId !== destination.droppableId) {
            console.log(source);
            console.log(destination);
            const sourceColIndex = todos[location.state.kanbanIndex].kanban.findIndex(e => e.id === source.droppableId);
            const destinationColIndex = todos[location.state.kanbanIndex].kanban.findIndex(e => e.id === destination.droppableId);

            const sourceCol = todos[location.state.kanbanIndex].kanban[sourceColIndex];
            const destinationCol = todos[location.state.kanbanIndex].kanban[destinationColIndex];

            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];

            // const [removed] = sourceTask.splice(source.index, 1);
            let [removed] = JSON.parse(JSON.stringify(sourceTask.splice(source.index, 1)));
            removed.listId = destination.droppableId
            destinationTask.splice(destination.index, 0, removed);

            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state[location.state.kanbanIndex].kanban[sourceColIndex].tasks = sourceTask;
                state[location.state.kanbanIndex].kanban[destinationColIndex].tasks = destinationTask;
                return state;
            });
            console.log(todos[location.state.kanbanIndex]);
        } else if (source.droppableId === destination.droppableId && source.index !== destination.index) {
            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state[location.state.kanbanIndex].kanban.map((el) => {
                    if (el.id === destination.droppableId) {
                        const [removed] = el.tasks.splice(source.index, 1);
                        el.tasks.splice(destination.index, 0, removed);
                    }
                    return el;
                })
                return state;
            });
            console.log(todos);
        }
    }

    function addTodoList() {
        if (input.length > 0) {
            setTodosState((oldTodoListsState) => {
                let state = JSON.parse(JSON.stringify(oldTodoListsState));
                state.map((element, i) => {
                    if (location.state.kanbanIndex === i) {
                        element.kanban.push({
                            id: uuidv4(),
                            title: input,
                            tasks: [],
                            index: element.kanban.length,
                            edit: false,
                            menu: false,
                        });
                    }
                    return element;
                })
                setInput('');
                return state;
            })
        }
    };

    function submit(e) {
        if (input.length > 0) {
            if (e.key === "Enter") {
                setTodosState((oldTodoListsState) => {
                    let state = JSON.parse(JSON.stringify(oldTodoListsState));
                    state.map((element, i) => {
                        if (location.state.kanbanIndex === i) {
                            element.kanban.push({
                                id: uuidv4(),
                                title: input,
                                tasks: [],
                                index: element.kanban.length,
                                edit: false,
                                menu: false,
                            });
                        }
                        return element;
                    })
                    setInput('');
                    return state;
                })
            } else if (e.key === "Escape") {
                // setTodosState((oldTodosState) => {
                //     let state = JSON.parse(JSON.stringify(oldTodosState));
                //     state.map((element, i) => {
                //         if (i === kanbanIndex) {
                //             element.kanban.map((list) => {
                //                 if (list.id === listId) {
                //                     list.edit = false;
                //                 }
                //                 return list;
                //             });
                //         }
                //         return element;
                //     })
                //     return state;
                // });
            }
        }
    }
    return (
        <div className='d-flex flex-column h100'>
            <div className='mb-20 h20'>
                {/* <h2 className='d-flex justify-content-center mb-20'>{location.state.name}</h2> */}
                <div className='container-addList d-flex justify-content-center align-items-center'>
                    {!showInput && <button className='p-20 btn btn-primary addList d-flex justify-content-sb align-items-center flex-fill' onClick={() => setShowInput(true)}><span>Ajouter une liste</span><i className="fa-solid fa-plus"></i></button>}
                    {showInput && <input className='inputAddList' type="text" placeholder="Saisissez un nom de liste" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => submit(e)} />}
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="d-flex justify-content-se flex-row kanban-container h80">
                    {todos[location.state.kanbanIndex].kanban.length > 0 && todos[location.state.kanbanIndex].kanban.map((section, index) => (
                        <TodoList key={index} listId={section.id} section={section} index={index} kanbanIndex={location.state.kanbanIndex} kanbanId={location.state.id} />
                    ))}
                </div>
            </DragDropContext>
        </div >
    )
}


export default TodoListGroup;