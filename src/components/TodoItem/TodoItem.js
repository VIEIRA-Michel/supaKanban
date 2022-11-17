import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { todosState } from '../../recoil';

function TodoItem({ id, content }) {
    // const setTodosState = useSetRecoilState(todosState);
    // const [inputValue, setInputValue] = useState(todo.content);

    // function updateTodo(editTodo) {
    //     setTodosState((oldTodosState) => oldTodosState.map(ot => ot._id === editTodo._id ? editTodo : ot));
    // }

    // function deleteTodo() {
    //     setTodosState((oldTodosState) => oldTodosState.filter((ot) => ot._id !== todo._id));
    // }
    return (
        <li className={`d-flex align-items-center mb-20`}>
            <span>{content}</span>
            {/* <span>{content}</span> */}
            {/* {todo.edit ? (
                <>
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='mr-15 flex-fill' />
                    <button onClick={() => updateTodo({ ...todo, edit: false })} className='btn btn-primary mr-15'>Annuler</button>
                    <button onClick={() => updateTodo({ ...todo, content: inputValue, edit: false })} className='btn btn-secondary'>Sauvegarder</button>
                </>
            ) : (<>
                <span className="flex-fill mr-15" style={{ textDecoration: todo.done && 'line-through' }}>{todo.content}</span>
                <button onClick={() => updateTodo({ ...todo, done: !todo.done })} className='btn btn-primary mr-15'>{todo.done ? 'Annuler' : 'Valider'}</button>
                <button onClick={deleteTodo} className='btn btn-danger mr-15'>Supprimer</button>
                <button onClick={() => updateTodo({ ...todo, edit: true })} className='btn btn-secondary mr-15'>Modifier</button>
                <button onClick={onClick} className='btn btn-primary'>Details</button>
            </>
            )} */}

        </li>
    )
}

export default TodoItem;