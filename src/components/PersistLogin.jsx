/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import Loading from './Loaders/Loading'

function PersistLogin() {

    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false

    }, []);

    return (
        <>
            {
                !persist
                    ? <Outlet />
                    : isLoading
                        ? <Loading isLoading={isLoading} />
                        : <Outlet />
            }
        </>
    )
}

export default PersistLogin