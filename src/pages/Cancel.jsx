/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import Header from '../components/partials/Header/Header'
import Subscribe from '../components/Subscribe/Subscribe'
import Footer from '../components/partials/Footer/Footer'
import { UserAndInstructor, UserOnly } from '../utils/rolePermission'
import { useNavigate } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'

function Cancel() {

    const userAndInstructor = UserAndInstructor();
    const userOnly = UserOnly();
    const navigate = useNavigate()
    const refresh = useRefreshToken();
    const [isLoading, setIsLoading] = useState(false)
    const { auth } = useAuth()
    const queryParams = new URLSearchParams(location.search);

    const navigateToEnrolledPage = () => {
        const navigatePage =
            userAndInstructor
                ? '/dashboard/instructor-cp/selected'
                : userOnly
                    ? '/dashboard/student-cp/selected'
                    : '/auth'

        return navigate(navigatePage)
    }

    useEffect(() => {

        const redirectUrl = queryParams.get('redirectUrl')
        if (redirectUrl !== 'paymentGateway') {
            return navigate('/')
        }

        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                setIsLoading(true)
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
    }, [])

    return (
        <Fragment>
            <Header />
            <main>
                <section>
                    <div className='w-full max-w-md mx-auto my-32 grid place-items-center'>
                        <iframe src="https://lottie.host/embed/093af34c-3682-49f8-8937-ce9da2827f24/D6aymKpTgK.json"></iframe>
                        <h1 className='text-red-800 font-500 text-xl mt-5'>
                            Payment Cancelled! 😢
                        </h1>
                        <button onClick={navigateToEnrolledPage} className='mt-4 border border-solid border-red-900 bg-slate-50 text-red-900 transition-all p-3 text-sm hover:text-slate-50 hover:bg-red-900 hover:border-current hover:rounded-full'>
                            <span>
                                Go to payment page
                            </span>
                        </button>
                    </div>
                </section>
            </main>
            <Subscribe />
            <Footer />
        </Fragment>
    )
}

export default Cancel 