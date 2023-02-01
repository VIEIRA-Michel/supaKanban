import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
const TodoListGroup = lazy(() => import('./components/TodoListGroup/TodoListGroup'));
const TodoListsBoardManagement = lazy(() => import('./components/TodoListsBoardManagement/TodoListsBoardManagement'));
const LoginForm = lazy(() => import('./components/Form/LoginForm/LoginForm'));
const RegisterForm = lazy(() => import('./components/Form/RegisterForm/RegisterForm'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [,
            {
                path: '/signup',
                element: <RegisterForm />
            },
            {
                path: '/signin',
                element: <LoginForm />
            },
            {
                path: '/:idKanban',
                element: <TodoListGroup />,
            },
            {
                path: '/board',
                element: <TodoListsBoardManagement />,
            },
        ],
    },
]);