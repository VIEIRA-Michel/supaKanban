import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Suspense, useLayoutEffect, useState } from 'react';
import { checkIsAuth } from './apis/auth';
import { useSetRecoilState } from "recoil";
import { userState } from './recoil';
import { lazy } from 'react';
const Loading = lazy(() => import('./components/Loading/Loading'));

function App() {
  const [done, setDone] = useState(false);
  const setUserData = useSetRecoilState(userState);

  useLayoutEffect(() => {
    checkIsAuth().then((result) => {
      if (result !== null) {
        const { user } = result;
        setUserData(user);
      }
      setTimeout(() => { setDone(!done) }, 600)
    }).catch((e) => {
      console.log(e)
    })
  }, [])
  return (
    <>
      {done ? (
        <div className='app'>
          <Header />
          <div className='flex flex-col justify-center items-center w-full mt-10 z-[-1] h-[80vh]'>
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
