import './App.css';
import TodoListGroup from './components/TodoListGroup/TodoListGroup';
function App() {
  console.log('BUILD APP');
  return (
    <div className='d-flex flex-row justify-content-center align-items-center p-20'>
      <div className='card container p-20'>
        <h1 className='mb-20 d-flex align-items-center'>
          <span className='flex-fill mr-15'>Todo App</span>
        </h1>
        <TodoListGroup />
      </div>
    </div>
  );
}

export default App;
