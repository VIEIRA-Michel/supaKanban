import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import TodoListGroup from './components/TodoListGroup/TodoListGroup';
import TodoListsBoardManagement from './components/TodoListsBoardManagement/TodoListsBoardManagement';
import AuthView from './views/AuthView';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/auth',
                element: <AuthView />,
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