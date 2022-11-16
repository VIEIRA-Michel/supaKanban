import './App.css';
import AddTodo from './components/AddTodo/AddTodo';
import FilterTodo from './components/FilterTodo/FilterTodo';
import TodoList from './components/TodoList/TodoList';
import TodoData from './components/TodoData/TodoData';

function App() {
  console.log('BUILD APP');
  return (
    <div className='d-flex flex-row justify-content-center align-items-center p-20'>
      <div className='card container p-20'>
        <h1 className='mb-20 d-flex align-items-center'>
          <span className='flex-fill mr-15'>Todo App</span>
          <FilterTodo />
        </h1>
        <AddTodo />
        <TodoList />
        <TodoData />
      </div>
    </div>
  );
}

export default App;
