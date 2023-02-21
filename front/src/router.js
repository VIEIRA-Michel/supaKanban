import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import ProtectedRoute from './guards/ProtectedRoute';
const TodoListGroup = lazy(() => import('./components/TodoListGroup/TodoListGroup'));
const TodoListsBoardManagement = lazy(() => import('./components/TodoListsBoardManagement/TodoListsBoardManagement'));
const LoginForm = lazy(() => import('./components/Form/LoginForm/LoginForm'));
const RegisterForm = lazy(() => import('./components/Form/RegisterForm/RegisterForm'));
const Profile = lazy(() => import('./components/Profile/Profile'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
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
                element: <ProtectedRoute><TodoListGroup /></ProtectedRoute>,
            },
            {
                path: '/board',
                element: <ProtectedRoute><TodoListsBoardManagement /></ProtectedRoute>,
            },
            {
                path: '/profile',
                element: <ProtectedRoute><Profile /></ProtectedRoute>,
            },
        ],
    },
]);