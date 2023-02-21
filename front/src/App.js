import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='flex flex-col justify-center items-center w-full mt-10 z-[-1]'>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
