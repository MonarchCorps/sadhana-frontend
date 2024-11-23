/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from 'react'
import useAuth from '../../../../../hooks/useAuth'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import trim from '../../../../../utils/trim'
import StatusMessage from '../../../../../components/StatusMessage'
import getTotalPrice from '../../../../../utils/getTotalPrice'
import Loading from '../../../../../components/Loaders/Loading'
import { useNavigate } from 'react-router-dom'
import { UserAndInstructor, UserOnly } from '../../../../../utils/rolePermission'

function PaymentSummary({ selectedCourses }) {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [msgs, setMsgs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const userAndInstructor = UserAndInstructor();
    const userOnly = UserOnly();

    const items = selectedCourses.map(course => ({
        _id: course?._id,
        userId: course?.userId,
        price: course?.price,
        classname: course?.classname
    }));

    const navigateToSelectedPage = () => {
        const navigatePage =
            userAndInstructor
                ? '/dashboard/instructor-cp/selected'
                : userOnly
                    ? '/dashboard/student-cp/selected'
                    : '/auth'

        return navigate(navigatePage)
    }

    const handlePayment = async () => {
        if (items.length > 5) {
            addMessage("You can't pay for more than 5 courses at once", 'error');
            return;
        }

        try {
            const response = await axiosPrivate.post(`/paystack/payment/${auth?._id}/initialize`, { items }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            const { authorization_url } = response.data.data;
            window.location.href = authorization_url;

        } catch (error) {
            if (!error?.response) {
                addMessage('No server response', 'error');
            } else {
                addMessage(error.response.data.message, 'error');
            }
        }
    };

    const verifyPayment = async () => {

        const reference = new URLSearchParams(window.location.search).get('reference');

        try {
            setIsLoading(true);
            const response = await axiosPrivate.post(`/paystack/payment/${auth?._id}/verify`, { reference, items }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.data.message === 'Payment verified and processed successfully!') {
                navigate('/success')
            } else {
                addMessage('Payment verification failed.', 'error');
            }
        } catch (error) {
            if (!error?.response) {
                addMessage('No server response', 'error');
            } else {
                addMessage(error.response.data.message, 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const reference = new URLSearchParams(window.location.search).get('reference');
        if (reference) {
            verifyPayment()
            navigateToSelectedPage()
        };
    }, []);

    const addMessage = (msg, type) => {
        const id = Date.now();
        setMsgs(prevMsgs => [...prevMsgs, { id, msg, type }]);
    };

    useEffect(() => {
        if (msgs.length > 0) {
            const timer = setTimeout(() => {
                setMsgs(prevMsgs => prevMsgs.slice(1));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [msgs]);

    return (
        <Fragment>
            <Loading isLoading={isLoading} text='Verifying' bgColor='#fff' />
            <StatusMessage isLoading={isLoading} msgs={msgs} />
            <div className="w-[20rem]">
                <div className="sticky top-3">
                    <h1 className="font-sans text-[1.05rem] text-slate-900 bg-[#f5f5dc] px-3 py-2 rounded-sm">
                        Payment Summary
                    </h1>
                    <div className='min-h-64 border border-solid border-slate-50 shadow-sm mt-3 p-3 flex justify-between flex-col'>
                        <ul>
                            <li className="grid grid-flow-col justify-between border-b border-solid border-b-slate-100 pb-2 mb-3">
                                <h1>Courses ({selectedCourses?.length})</h1>
                                <h1>
                                    # <span className="text-xl font-roboto text-green-900">{getTotalPrice(selectedCourses, 'price')}</span>
                                </h1>
                            </li>
                            {selectedCourses?.map((course, i) => (
                                <li key={course?._id} className="grid grid-flow-col justify-between">
                                    <div>
                                        <span>{i + 1}. </span>
                                        <span className="font-500 text-sm">{trim(course?.classname, 20)}</span>
                                    </div>
                                    <div>
                                        <span># <span className='text-green-900'>{course?.price}</span></span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className='text-sm mt-3'>
                            <strong>Note: </strong>
                            Other charges may apply
                        </p>
                    </div>
                    <button
                        className="bg-slate-900 text-slate-50 w-full text-center mt-4 py-3 px-2 rounded-md text-sm font-500 transition-all border border-solid border-current hover:text-slate-900 hover:bg-slate-50 hover:border-slate-900"
                        onClick={handlePayment}
                    >
                        Proceed to payment
                    </button>
                </div>
            </div>
        </Fragment>
    );

}

export default PaymentSummary
