import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todosState } from '../../recoil';

function AddTodo() {
    const [inputValue, setInputValue] = useState('');
    const setTodosState = useSetRecoilState(todosState);

    function handleOnChange(event) {
        setInputValue(event.target.value);
    }

    function handleClick() {
        setTodosState((oldTodosState) => [...oldTodosState, {
            _id: crypto.randomUUID(),
            content: inputValue,
            done: false,
            edit: false
        }])
        setInputValue('');
        // console.log(inputValue);
    }


    return (
        <div className='d-flex align-items-center mb-20'>
            <input value={inputValue} onChange={handleOnChange} type="text" className='flex-fill mr-15' />
            <button onClick={handleClick} className="btn btn-primary">Ajouter todo</button>
        </div>
    )
}

export default AddTodo;