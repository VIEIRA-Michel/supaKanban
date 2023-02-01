import './App.scss';
import Header from './components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { todosState } from './recoil';
import { useEffect, useState, Suspense } from 'react';
function App() {
  const todos = useRecoilValue(todosState);
  const [check, setCheck] = useState(false);
  const location = useLocation();
  let url = location.pathname.substring(1);

  useEffect(() => {
    if (url !== '' || url !== 'board') {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === url) {
          setCheck(true);
          break;
        }
      }
    }
  }, [url, todos])

  // async function test() {
  //   const response = await fetch('/api/test');
  //   console.log(await response.json());
  // }

  // test();

  return (
    <div className='app'>
      <Header />
      <div className='d-flex flex-row justify-content-center p-20 flex-fill mainContainer'>
        <div className="d-flex flex-column align-items-center flex-fill">
          {/* {check ? <Outlet /> : <TodoListsBoardManagement />} */}
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
