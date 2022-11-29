import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import TodoListGroup from './components/TodoListGroup/TodoListGroup';
import TodoListsBoardManagement from './components/TodoListsBoardManagement/TodoListsBoardManagement';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
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