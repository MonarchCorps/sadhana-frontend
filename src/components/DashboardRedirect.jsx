import { Fragment, useEffect } from 'react'
import Loading from './Loaders/Loading'
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

function DashboardRedirect() {

    const { auth } = useAuth();

    const navigate = useNavigate()
    const location = useLocation().pathname.split('/')

    // if the path in the first idx is 2 and there is only two in the url ('' && 'dashboard')
    const path = (location.length === 2 || location[2] === '') && location[1] === 'dashboard'

    useEffect(() => {
        if (path) {
            auth?.roles?.includes(5150)
                ? navigate('/dashboard/admin-cp')
                : auth?.roles?.includes(1984)
                    ? navigate('/dashboard/instructor-cp')
                    : auth?.roles?.includes(2001)
                        ? navigate('/dashboard/student-cp')
                        : '/auth'
        }
    }, [auth?.roles, navigate, path])

    return (
        <Fragment>
            <Loading isLoading={true} />
        </Fragment>
    )
}

export default DashboardRedirect