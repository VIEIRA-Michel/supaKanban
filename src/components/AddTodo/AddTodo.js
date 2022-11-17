import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todosState } from '../../recoil';

function AddTodo({ id, value, onChange, showInput }) {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodosState] = useRecoilState(todosState);

    function handleOnChange(event) {
        onChange(event.target.value);
    }

    // function handleClick(e) {
    //     console.log(e)
    //     // setTodosState((oldTodosState) => [...oldTodosState, {
    //     //     _id: crypto.randomUUID(),
    //     //     content: inputValue,
    //     //     done: false,
    //     //     edit: false
    //     // }])
    //     // setInputValue('');
    //     // console.log(inputValue);
    // }

    function submit(e) {
        const todo = { id: crypto.randomUUID(), content: value }
        if (e.key === "Enter") {
            setTodosState((oldTodosState) => {
                const state = [...oldTodosState];
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
            <textarea value={value} onChange={handleOnChange} type="text" className='flex-fill' onKeyDown={(e) => submit(e)} />
            {/* <button onClick={handleClick} className="btn btn-primary" id={id}>Ajouter todo</button> */}
        </div>
    )
}

export default AddTodo;