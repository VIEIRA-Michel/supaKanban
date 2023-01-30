import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import TodoListGroup from './components/TodoListGroup/TodoListGroup';
import TodoListsBoardManagement from './components/TodoListsBoardManagement/TodoListsBoardManagement';
import Register from './components/Form/Register/Register';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/register',
                element: <Register />,
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