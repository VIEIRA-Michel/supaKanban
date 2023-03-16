import './App.scss';
import Header from './components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useLayoutEffect, useState } from 'react';
import { useUserActions } from './actions/user.actions';
import { lazy } from 'react';
const Loading = lazy(() => import('./components/Loading/Loading'));

function App() {
  const [done, setDone] = useState(false);
  const { pathname } = useLocation();
  const useUser = useUserActions();

  useLayoutEffect(() => {
    async function check() {
      try {
        await useUser.checkUserIsConnected();
        setTimeout(() => { setDone(true) }, 750)
      } catch (error) {
        console.log(error);
      }
    }
    check();
  }, [pathname])
  return (
    <>
      {done ? (
        <div className='app'>
          <Header />
          <div className='flex flex-col justify-center items-center w-full mt-[50px] z-[-1]'>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </div>
      ) : (
        <div className='app'>
          <Loading />
        </div>
      )}
    </>

  );
}

export default App;
