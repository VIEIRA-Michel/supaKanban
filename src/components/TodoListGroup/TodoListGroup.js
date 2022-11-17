import { useRecoilState } from 'recoil';
import { todosState } from '../../recoil';
import TodoList from '../TodoList/TodoList';
function TodoListGroup() {
    const [todos, setTodos] = useRecoilState(todosState);

    function addTodoList() {
        setTodos(oldValue => {
            return [...oldValue, []]
        });

        // oldValue + 1;
    }
    // console.log(todos);
    // console.log(todos.length);
    // const a = [];
    // for (let i = 0; i < countOfListTodos; i++) {
    //     a.push(<TodoList />);
    // }
    console.log(todos);
    return (
        <>
            <div>
                <button className='p-10' onClick={addTodoList}>+</button>
                {/* <p>Nombre de liste : {countOfListTodos} </p> */}
            </div>
            <div className="d-flex justify-content-se flex-row">
                {todos && todos.length > 0 ? (todos.map(element => <TodoList key={todos.indexOf(element)} listId={todos.indexOf(element)} />)) : (<p>Commencez par créer une liste de tâche</p>)}
                {/* {todos.length > 0 && todos.map(element => console.log/>)} */}
            </div>
            {/* {todos.length > 0 && todos.map(element => <TodoList />)} */}
        </>
    )
}

export default TodoListGroup;