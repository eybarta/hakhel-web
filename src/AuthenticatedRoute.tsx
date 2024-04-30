import { Navigate, Outlet } from 'react-router-dom';

export const AuthenticatedRoute = ({ isAuthenticated }: { isAuthenticated: boolean}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
