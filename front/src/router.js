import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
const TodoListGroup = lazy(() => import('./components/TodoListGroup/TodoListGroup'));
const TodoListsBoardManagement = lazy(() => import('./components/TodoListsBoardManagement/TodoListsBoardManagement'));
const LoginForm = lazy(() => import('./components/Form/LoginForm/LoginForm'));
const RegisterForm = lazy(() => import('./components/Form/RegisterForm/RegisterForm'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Home = lazy(() => import('./components/Home/Home'));
const NoteList = lazy(() => import('./components/Note/NoteList/NoteList'));
const Note = lazy(() => import('./components/Note/Note/Note'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/signup',
                element: <RegisterForm />
            },
            {
                path: '/signin',
                element: <LoginForm />
            },
            {
                path: '/kanban',
                element: <TodoListsBoardManagement />,
            },
            {
                path: '/kanban/:id',
                element: <TodoListGroup />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/note',
                element: <NoteList />,
            },
            {
                path: '/note/:id',
                element: <Note />,
            }
        ],
    },
]);