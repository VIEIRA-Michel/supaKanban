import { useSetRecoilState } from 'recoil';
import { todosState } from '../../../../recoil';
import { v4 as uuidv4 } from 'uuid';

import './AddTodo.scss';

function AddTodo({ id, value, onChange, showInput, index, kanbanIndex, listId }) {
    const setTodosState = useSetRecoilState(todosState);
    function handleOnChange(e) {
        onChange(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }
    function submit(e) {
        if (e.key === "Enter") {
            setTodosState((oldTodosState) => {
                let state = JSON.parse(JSON.stringify(oldTodosState));
                state[kanbanIndex].kanban[index].tasks.push({ id: uuidv4(), column: index, content: value, edit: false, menu: false, listId: listId });
                return state;
            });
            onChange('');
            showInput(false);
        }
    }

    return (
        <div className='d-flex align-items-center flex-fill'>
            <textarea value={value} onChange={handleOnChange} type="text" className='flex-fill' placeholder='Saisissez le nom de la tâche' onKeyDown={(e) => submit(e)} />
        </div>
    )
}

export default AddTodo;