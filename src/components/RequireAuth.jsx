/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ROLES = {
    User: 2001,
    Instructor: 1984,
    Admin: 5150
}

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    if (!auth?.roles || auth.roles.length === 0) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    const hasAdminRole = auth?.roles?.includes(ROLES.Admin);
    const hasInstructorRole = auth?.roles?.includes(ROLES.Instructor);
    const hasUserRole = auth?.roles?.includes(ROLES.User);

    if (allowedRoles.includes(ROLES.Admin) && allowedRoles.includes(ROLES.Instructor) && allowedRoles.includes(ROLES.User)) {
        if (auth?.roles) {
            return <Outlet />
        } else {
            return <Navigate to='/auth' state={{ from: location }} replace />
        }
    }

    if (allowedRoles.includes(ROLES.Admin)) {
        if (hasUserRole && hasInstructorRole && hasAdminRole) {
            return <Outlet />
        } else {
            return <Navigate to='/unauthorized' state={{ from: location }} replace />
        }
    }

    if (allowedRoles.includes(ROLES.Instructor)) {
        if (hasUserRole && hasInstructorRole && !hasAdminRole) {
            return <Outlet />
        } else {
            return <Navigate to='/unauthorized' state={{ from: location }} replace />
        }
    }

    if (allowedRoles.includes(ROLES.User)) {
        if (hasUserRole && !hasInstructorRole && !hasAdminRole) {
            return <Outlet />
        } else {
            return <Navigate to='/unauthorized' state={{ from: location }} replace />
        }
    }

}

export default RequireAuth
