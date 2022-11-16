import { selectFilteredTodos } from "../../recoil";
import { useRecoilValue } from 'recoil';
import TodoItem from "../TodoItem/TodoItem";


function TodoList() {
    const filteredTodos = useRecoilValue(selectFilteredTodos);
    return (
        <ul>
            {filteredTodos && filteredTodos.map((todo) => <TodoItem key={todo._id} todo={todo} />)}
        </ul>
    )
}

export default TodoList;