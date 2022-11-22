import './TodoItem.scss';

function TodoItem({ todo }) {
    console.log(todo);
    return (
        <div className="card">
            <div className="card__title">
                {todo.content}
            </div>
            {/* {props.children} */}
        </div>
    )
}

export default TodoItem;