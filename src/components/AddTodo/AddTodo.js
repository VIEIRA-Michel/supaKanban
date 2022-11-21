import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todosState } from '../../recoil';

function AddTodo({ id, value, onChange, showInput }) {
    const [todos, setTodosState] = useRecoilState(todosState);
    function handleOnChange(event) {
        onChange(event.target.value);
    }

    function submit(e) {
        if (e.key === "Enter") {
            setTodosState((oldTodosState) => {
                const state = [...oldTodosState];
                const todo = { id: state[id].length, column: id, content: value, edit: false }
                state[id] = [...state[id], todo]
                return state;
            }
            );
            onChange('');
            showInput(false);
        }
    }

    return (
        <div className='d-flex align-items-center mb-20'>
            <input value={value} onChange={handleOnChange} type="text" className='flex-fill' onKeyDown={(e) => submit(e)} />
        </div>
    )
}

export default AddTodo;