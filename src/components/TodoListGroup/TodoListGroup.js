import { useRecoilState } from 'recoil';
import { todosState } from '../../recoil';
import TodoList from '../TodoList/TodoList';
function TodoListGroup() {
    const [todos, setTodos] = useRecoilState(todosState);

    function addTodoList() {
        setTodos(oldValue => {
            return [...oldValue, []]
        });
    }
    return (
        <>
            <div>
                <button className='p-10' onClick={addTodoList}>+</button>
            </div>
            <div className="d-flex justify-content-se flex-row">
                {todos && todos.length > 0 ? (todos.map(element => <TodoList key={todos.indexOf(element)} listId={todos.indexOf(element)} />)) : (<p>Commencez par créer une liste de tâche</p>)}
            </div>
        </>
    )
}

export default TodoListGroup;