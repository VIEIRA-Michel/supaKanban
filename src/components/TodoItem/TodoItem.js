import { useState } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { todosState } from '../../recoil';

function TodoItem({ listId, todo }) {
    // const setTodosState = useSetRecoilState(todosState);
    const [todos, setTodosState] = useRecoilState(todosState);
    const [inputValue, setInputValue] = useState(todo.content);

    function updateTodo(editTodo) {
        setTodosState((oldTodosState) => oldTodosState.map(todoList => oldTodosState.indexOf(todoList) === listId ? todoList.map((ot) => ot.id == editTodo.id ? editTodo : ot) : todoList));
    }

    function deleteTodo() {
        setTodosState((oldTodosState) => oldTodosState.map(todoList => oldTodosState.indexOf(todoList) === listId ? todoList.filter((ot) => ot.id !== todo.id) : todoList));
    }
    return (
        <li className={`d-flex align-items-center m-10 b4 p-10`}>
            {todo.edit ? (
                <>
                    <p>ediiiit</p>
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='mr-15 flex-fill' />
                    <button onClick={() => updateTodo({ ...todo, edit: false })} className='btn btn-primary mr-15'>Annuler</button>
                    <button onClick={() => updateTodo({ ...todo, content: inputValue, edit: false })} className='btn btn-secondary'>Sauvegarder</button>
                </>
            ) : (<>
                <span className="flex-fill mr-15" style={{ textDecoration: todo.done && 'line-through' }}>{todo.content}</span>
                {/* <button onClick={() => updateTodo({ ...todo, done: !todo.done })} className='btn btn-primary mr-15'>{todo.done ? 'Annuler' : 'Valider'}</button> */}
                <button onClick={deleteTodo} className='btn btn-danger mr-15'>Supprimer</button>
                <button onClick={() => updateTodo({ ...todo, edit: true })} className='btn btn-secondary mr-15'>Modifier</button>
            </>
            )}

        </li>
    )
}

export default TodoItem;