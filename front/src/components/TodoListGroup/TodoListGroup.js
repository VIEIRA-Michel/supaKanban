import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todosState } from '../../recoil';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import TodoList from './TodoList/TodoList';


function TodoListGroup() {
    const [todos, setTodosState] = useRecoilState(todosState);
    const [input, setInput] = useState('');
    const [showInput, setShowInput] = useState(false);
    let location = useLocation();
    let url = location.pathname.substring(1);
    const kanbanIndex = todos.findIndex(e => e.id === url);
    console.log(todos[kanbanIndex].name);

    function onDragEnd(result) {
        if (!result.destination) return
        const { source, destination } = result
        if (source.droppableId !== destination.droppableId) {

            const sourceColIndex = todos[kanbanIndex].kanban.findIndex(e => e.id === source.droppableId);
            const destinationColIndex = todos[kanbanIndex].kanban.findIndex(e => e.id === destination.droppableId);

            const sourceCol = todos[kanbanIndex].kanban[sourceColIndex];
            const destinationCol = todos[kanbanIndex].kanban[destinationColIndex];

            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];

            let [removed] = JSON.parse(JSON.stringify(sourceTask.splice(source.index, 1)));
            removed.listId = destination.droppableId
            destinationTask.splice(destination.index, 0, removed);

            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state[kanbanIndex].kanban[sourceColIndex].tasks = sourceTask;
                state[kanbanIndex].kanban[destinationColIndex].tasks = destinationTask;
                return state;
            });
        } else if (source.droppableId === destination.droppableId && source.index !== destination.index) {
            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state[kanbanIndex].kanban.map((el) => {
                    if (el.id === destination.droppableId) {
                        const [removed] = el.tasks.splice(source.index, 1);
                        el.tasks.splice(destination.index, 0, removed);
                    }
                    return el;
                })
                return state;
            });
        }
    }

    function submit(e) {
        if (input.length > 0) {
            if (e.key === "Enter") {
                setTodosState((oldTodoListsState) => {
                    let state = JSON.parse(JSON.stringify(oldTodoListsState));
                    state.map((element, i) => {
                        if (kanbanIndex === i) {
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
                    setShowInput(false);
                    return state;
                })
            } else if (e.key === "Escape") {
                setInput('');
                setShowInput(false);
            }
        }
    }
    return (
        <div className='flex flex-col h-full'>
            <h2 className='mb-5 flex justify-center'>{todos[kanbanIndex].name}</h2>
            <div className={`mb-5 h-1/5 flex justify-center list-${todos[kanbanIndex].kanban.length} items-center`}>
                <div className='w-[200px] m-auto flex justify-center items-center'>
                    {!showInput && <button className={`p-[20px] py-2.5 px-5 cursor-pointer opacity-80 transition-opacity hover:opacity-100 text-sm rounded-[15px] w-[200px] shadow-[0_2px_18px_0_rgba(0,0,0,0.5)] border-none bg-secondary list-${todos[kanbanIndex].kanban.length} flex justify-between items-center flex-auto`} onClick={() => setShowInput(true)}><span>Ajouter une liste</span><i className="fa-solid fa-plus"></i></button>}
                    {showInput && <>
                        <input className='font-[Dosis] w-[200px] h-[38px] rounded-[15px] border-none px-[5px]' type="text" placeholder="Saisissez un nom de liste" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => submit(e)} />
                        <button className='rounded-full border-none cursor-pointer ml-2.5 bg-secondary' onClick={() => setShowInput(false)}><i className="fa-solid fa-xmark py-2 px-2.5 text-white text-sm leading-3 rounded-[5px] cursor-pointer opacity-80 hover:transition-all hover:opacity-100"></i></button>
                    </>
                    }
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex justify-evenly items-start flex-row flex-wrap">
                    {todos[kanbanIndex].kanban.length > 0 && todos[kanbanIndex].kanban.map((section, index) => (
                        <TodoList key={index} listId={section.id} section={section} index={index} kanbanIndex={kanbanIndex} kanbanId={url} />
                    ))}
                </div>
            </DragDropContext>
        </div>
    )
}


export default TodoListGroup;