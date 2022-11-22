import './App.scss';
import TodoListGroup from './components/TodoListGroup/TodoListGroup';
function App() {
  console.log('BUILD APP');
  return (
    <div className='d-flex flex-row justify-content-center p-20 flex-fill mainContainer'>
      <div className='p-20 border-radius-20'>
        <h1 className='mb-20 d-flex align-items-center'>
          supaKanban
        </h1>
        <TodoListGroup />
      </div>
    </div>
  );
}

export default App;
