/* eslint-disable react/prop-types */
import { Fragment } from 'react'
import useAuth from '../../../../../hooks/useAuth'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import trim from '../../../../../utils/trim'
import getTotalPrice from '../../../../../utils/getTotalPrice'

import { useMutation } from '@tanstack/react-query'
import { loadStripe } from '@stripe/stripe-js'

function PaymentSummary({ selectedCourses }) {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const items = selectedCourses.map(course => ({
        _id: course?._id,
        thumbnailPhoto: course?.thumbnailPhoto,
        userId: course?.userId,
        price: course?.price,
        classname: course?.classname
    }));

    const handlePayment = useMutation({
        mutationFn: async (items) => {
            const response = await axiosPrivate.post(
                `/payment/${auth?._id}`,
                { items },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return response?.data;
        },
        onSuccess: async (data) => {
            if (data?.id) {
                const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
                await stripe.redirectToCheckout({ sessionId: data.id });
            }
        },
        onError: (error) => {
            console.error("Payment error:", error);
        }
    });


    return (
        <Fragment>
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
                                        <span># <span className='text-green-900'>{(course.price).toLocaleString()}</span></span>
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
                        className={`bg-slate-900 text-slate-50 w-full text-center mt-4 py-3 px-2 rounded-md text-sm font-500 transition-all border border-solid border-current hover:text-slate-900 hover:bg-slate-50 hover:border-slate-900 ${handlePayment.isPending && 'opacity-55'}`}
                        onClick={() => handlePayment.mutate(items)}
                        disabled={handlePayment.isPending}
                    >
                        {handlePayment.isPending ? 'Proceeding...' : ' Proceed to payment'}
                    </button>
                </div>
            </div>
        </Fragment>
    );

}

export default PaymentSummary
