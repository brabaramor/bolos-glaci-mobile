import { Navigate } from 'react-router-dom';

import { appRoutes } from '../config/appRoutes';
import { isAuthenticated } from '../services/authService';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  isAuthenticated() ? <>{children}</> : <Navigate to={appRoutes.adminLogin} replace />;

export default AdminRoute;
