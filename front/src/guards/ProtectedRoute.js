import { Navigate } from 'react-router-dom';
import { useUserActions } from '../actions';

function ProtectedRoute({ children }) {
    const useUser = useUserActions();
    if (useUser.checkUserIsConnected()) {
        return children
    } else {
        <Navigate to="/signin" />
    }
}

export default ProtectedRoute;