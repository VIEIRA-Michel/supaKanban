import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todosState } from '../../recoil';
import { v4 as uuidv4 } from 'uuid'
import TodoList from '../TodoList/TodoList';
import './TodoListGroup.scss';


function TodoListGroup() {
    const [todos, setTodosState] = useRecoilState(todosState);
    const [input, setInput] = useState('');

    function onDragEnd(result) {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {

            const sourceColIndex = todos.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = todos.findIndex(e => e.id === destination.droppableId)

            const sourceCol = todos[sourceColIndex]
            const destinationCol = todos[destinationColIndex]

            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state[sourceColIndex].tasks = sourceTask;
                state[destinationColIndex].tasks = destinationTask;
                return state;
            });
        }
    }

    function addTodoList() {
        if (input.length > 0) {
            setTodosState(oldValue => [...oldValue, {
                id: uuidv4(),
                title: input,
                tasks: [],
                index: todos.length,
                edit: false,
                menu: false,
            }])
            setInput('');
        }
    };

    return (
        <div className='d-flex flex-column h100'>
            <div className='mb h20'>
                <div className='d-flex justify-content-center align-items-center'>
                    <input className='inputAddList' type="text" placeholder="Saisissez un nom" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button className='p-20 btn btn-primary addList' onClick={addTodoList}>Ajouter une liste</button>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="d-flex justify-content-se flex-row kanban h80">
                    {todos.map((section, index) => (
                        <TodoList key={index} listId={section.id} section={section} index={index} />
                    )
                    )}
                </div>
            </DragDropContext>
        </div>
    )
}


export default TodoListGroup;