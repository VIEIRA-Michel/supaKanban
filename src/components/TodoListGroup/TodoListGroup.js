import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todosState } from '../../recoil';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import TodoList from '../TodoList/TodoList';
import './TodoListGroup.scss';


function TodoListGroup() {
    const [todos, setTodosState] = useRecoilState(todosState);
    const [input, setInput] = useState('');
    let location = useLocation();

    function onDragEnd(result) {
        if (!result.destination) return
        const { source, destination } = result
        console.log(source);
        console.log(destination);
        if (source.droppableId !== destination.droppableId) {
            // console.log(source.droppableId);
            // console.log(todos);
            const sourceColIndex = todos[location.state.kanbanIndex].kanban.findIndex(e => e.id === source.droppableId);
            const destinationColIndex = todos[location.state.kanbanIndex].kanban.findIndex(e => e.id === destination.droppableId);

            // console.log('source index', sourceColIndex);
            // console.log('destination index', destinationColIndex);
            const sourceCol = todos[location.state.kanbanIndex].kanban[sourceColIndex];
            const destinationCol = todos[location.state.kanbanIndex].kanban[destinationColIndex];

            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];

            const [removed] = sourceTask.splice(source.index, 1);
            destinationTask.splice(destination.index, 0, removed);

            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state[location.state.kanbanIndex].kanban[sourceColIndex].tasks = sourceTask;
                state[location.state.kanbanIndex].kanban[destinationColIndex].tasks = destinationTask;
                return state;
            });
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
    return (
        <div className='d-flex flex-column h100'>
            <div className='mb-20 h20'>
                {/* <h2 className='d-flex justify-content-center mb-20'>{location.state.name}</h2> */}
                <div className='d-flex justify-content-center align-items-center'>
                    <input className='inputAddList' type="text" placeholder="Saisissez un nom" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button className='p-20 btn btn-primary addList' onClick={addTodoList}>Ajouter une liste</button>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="d-flex justify-content-se flex-row kanban-container h80">
                    {todos[location.state.kanbanIndex].kanban.length > 0 && todos[location.state.kanbanIndex].kanban.map((section, index) => (
                        <TodoList key={index} listId={section.id} section={section} index={index} kanbanIndex={location.state.kanbanIndex} />
                    ))}
                </div>
            </DragDropContext>
        </div>
    )
}


export default TodoListGroup;