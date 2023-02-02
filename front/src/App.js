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
        <div className='d-flex flex-row justify-content-center p-20 flex-fill mainContainer'>
          <div className="d-flex flex-column align-items-center flex-fill">
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
