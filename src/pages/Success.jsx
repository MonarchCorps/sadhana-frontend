/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import Header from '../components/partials/Header/Header'
import Subscribe from '../components/Subscribe/Subscribe'
import Footer from '../components/partials/Footer/Footer'
import { UserAndInstructor, UserOnly } from '../utils/rolePermission'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useRefreshToken from '../hooks/useRefreshToken'

function Success() {

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
                ? '/dashboard/instructor-cp/enrolled'
                : userOnly
                    ? '/dashboard/student-cp/enrolled'
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
                    <div className='w-full max-w-md mx-auto my-36 grid place-items-center'>
                        <iframe src="https://lottie.host/embed/c1440b98-80ef-4221-be4b-9cde844d3d09/3JCqNSMm3T.json"></iframe>
                        <h1 className='text-green-800 font-500 text-xl mt-5'>
                            Payment successful! 😊🌿
                        </h1>
                        <button onClick={navigateToEnrolledPage} className='mt-4 border border-solid border-green-900 bg-slate-50 text-green-900 transition-all p-3 text-sm hover:text-slate-50 hover:bg-green-900 hover:border-current hover:rounded-full'>
                            <span>
                                Go to enrolled page
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

export default Success 