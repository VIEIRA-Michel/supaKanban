import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import TodoItem from "./TodoItem/TodoItem";
import AddTodo from './AddTodo/AddTodo';

function TodoList({ list, index, kanbanIndex, kanbanId, fToggleEdit, fToggleMenu, fDeleteList, fUpdateList }) {
    const [inputValue, setInputValue] = useState('');
    const [inputTitleValue, setInputTitleValue] = useState(list.title);
    const [showAddTodo, setShowAddTodo] = useState(false);

    function handleInputValue(content) {
        setInputValue(content)
    }

    function showInput(value) {
        setShowAddTodo(value);
    }

    return (
        <div className='m-5 max-w-[300px] p-5 shadow-[0_2px_18px_0_rgba(0,0,0,0.5)] rounded-[40px] bg-transparent'>
            <div className='flex flex-row justify-between items-center relative mt-[5px]'>
                <div className="text-base w-[84.7%]">
                    {list.edit ? <input className='font-[Dosis] p-[10px] rounded-[15px] w-full border-none' value={inputTitleValue} onChange={(e) => setInputTitleValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? fUpdateList(e, inputTitleValue) : e.key === "Enter" ? fToggleEdit : null} type="text" /> : <span className='block truncate no-underline font-bold text-secondary'>{list.title}</span>}
                </div>
                {list.edit ? (<div className="">
                    <i onClick={fToggleEdit} className="fa-solid fa-xmark text-base leading-3 py-2 px-2.5 bg-secondary text-white rounded-full cursor-pointer opacity-80 hover:opacity-100 hover:transition-all"></i>
                </div>) : (<div className="mr-[5px]">
                    <i onClick={fToggleMenu} className="fa-solid fa-ellipsis rounded-[5px] cursor-pointer opacity-80 text-secondary hover:opacity-100 hover:transition-all"></i>
                </div>)}
                {list.menu && (<div className='absolute right-[40px] bg-white rounded-[15px] p-[5px] mr-[10px] shadow-[0_2px_18px_0_rgba(0,0,0,0.3)]'>
                    <i onClick={fToggleEdit} className="fa-regular text-secondary fa-pen-to-square text-sm p-2.5 border-none bg-white rounded-[10px] cursor-pointer hover:text-white hover:bg-[#130f40] hover:transition-all"></i>
                    <i onClick={fDeleteList} className="fa-solid fa-trash text-secondary text-sm p-2.5 border-none bg-white rounded-[10px] cursor-pointer hover:text-white hover:bg-[#130f40] hover:transition-all"></i>
                </div>)}
            </div>
            <div className='min-w-[260px] rounded-[10px] font-thin mt-[25px]'>
                <div className="flex items-center">
                    {showAddTodo ? <>
                        <AddTodo id={list._id} value={inputValue} onChange={handleInputValue} showInput={showInput} index={index} kanbanIndex={kanbanIndex} />
                        <button onClick={() => setShowAddTodo(false)} className='rounded-full border-none flex justify-center items-center ml-2.5 bg-transparent text-white cursor-pointer opacity-80 p-0 hover:opacity-100 hover:transition-all h-[38px]'><i className="fa-solid fa-xmark text-sm leading-3 py-2 px-2.5 bg-primary rounded-full text-white cursor-pointer opacity-80 hover:opacity-100 hover:transition-all "></i></button>
                    </>
                        : <button className='flex justify-between text-white cursor-pointer opacity-80 items-center flex-auto bg-primary rounded-[15px] border border-[#130f40] py-2.5 px-5 hover:opacity-100 hover:transition-all' onClick={() => showInput(true)}><span>Ajoutez une tâche</span><i className="fa-solid fa-plus"></i></button>}
                </div>
                <div className="mt-0">
                    <Droppable key={list._id} droppableId={list._id}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                className=''
                                ref={provided.innerRef}
                            >
                                {
                                    list.tasks.map((task, index) => (
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
                                                    className="mt-2.5 first:mt-0"
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