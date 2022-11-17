import { selectTodoDetails, todosState } from "../../recoil";
import { useRecoilValue, useRecoilState } from 'recoil';
import { useState } from 'react';
import TodoItem from "../TodoItem/TodoItem";
// import TodoDetails from "../TodoDetails/TodoDetails";
import AddTodo from "../AddTodo/AddTodo";
import styles from './TodoList.module.scss';

function TodoList({ listId }) {
    // const [id, setId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    // const filteredTodos = useRecoilValue(selectFilteredTodos);
    // const todoDetails = useRecoilValue(selectTodoDetails(id));
    const todos = useRecoilValue(todosState);
    const [a, setA] = useState(false);

    // function selectTodo(_id) {
    //     setId(_id);
    // }

    // function addTask() {
    //     const todo = { id: crypto.randomUUID(), content: inputValue }
    //     console.log(todo);
    //     setTodosState((oldTodosState) => {
    //         const state = [...oldTodosState];
    //         state[id] = [...state[id], todo]
    //         return state;
    //     })
    //     setInputValue('');

    // }

    function handleInputValue(content) {
        setInputValue(content)
    }

    function showInput(value) {
        setA(value);
    }

    return (
        <div>
            {/* <ul className="mb-20">
                {filteredTodos && filteredTodos.map((todo) => <TodoItem key={todo._id} todo={todo} onClick={() => selectTodo(todo._id)} />)}
            </ul>
            {todoDetails && <TodoDetails todo={todoDetails} />}
            */}
            <div className={`d-flex justify-content-center flex-column b1 ${styles.column}`}>
                <div className="b3">
                    {a ? <AddTodo id={listId} value={inputValue} onChange={handleInputValue} showInput={showInput} /> : <button onClick={() => showInput(true)}>+</button>}
                </div>
                <ul className="d-flex flex-column flex-fill b2">
                    {todos[listId].length > 0 ? (todos[listId].map(todo => <TodoItem key={todos[listId].indexOf(todo)} id={todos[listId].indexOf(todo)} content={todo.content} />)) : <p>Ajoutez une tâche</p>}
                </ul>
            </div>
        </div>
    )
}

export default TodoList;