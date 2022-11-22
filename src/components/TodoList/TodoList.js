import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import TodoItem from "../TodoItem/TodoItem";
import './TodoList.scss';
import AddTodo from '../AddTodo/AddTodo';

import { todosState } from "../../recoil";
import { useRecoilValue } from 'recoil';

function TodoList({ section, listId, index }) {

    const [inputValue, setInputValue] = useState('');
    const [a, setA] = useState(false);

    function handleInputValue(content) {
        setInputValue(content)
    }

    function showInput(value) {
        setA(value);
    }


    return (
        <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    className='kanban__section'
                    ref={provided.innerRef}
                >
                    <div className="kanban__section__title">
                        {section.title}
                    </div>
                    <div className="kanban__section__button d-flex">
                        {a ? <AddTodo id={section.id} value={inputValue} onChange={handleInputValue} showInput={showInput} index={index} /> : <button className='p-10 d-flex justify-content-center flex-fill' onClick={() => showInput(true)}><span>Ajoutez une tâche</span><i className="fa-solid fa-plus"></i></button>}
                    </div>
                    <div className="kanban__section__content">
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
                                        >
                                            <TodoItem todo={task}>
                                            </TodoItem>
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    )
}

export default TodoList;