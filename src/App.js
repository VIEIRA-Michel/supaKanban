import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
      <Header />
      <div className='d-flex flex-row justify-content-center p-20 flex-fill mainContainer'>
        <div className="flex-fill">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
