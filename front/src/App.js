import './App.scss';
import Header from './components/Header/Header';
import AuthProvider from './components/AuthProvider/AuthProvider';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
function App() {
  return (
    <div className='app'>
      <AuthProvider>
        <Header />
        <div className='flex flex-col justify-center items-center w-full mt-10 z-[-1]'>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
