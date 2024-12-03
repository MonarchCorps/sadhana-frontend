/* eslint-disable react/prop-types */
import { format } from 'date-fns'
import { IKImage } from 'imagekitio-react'
import trim from '@/utils/trim'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

function EnrolledDetails({ details }) {

    const { screenWidth } = useGetScreenWidth()

    return (
        <AccordionItem value={details?._id} className='border-b-0' key={details?._id}>
            <AccordionTrigger className='grid grid-cols-12 ilg:grid-cols-9 amd:grid-cols-7 esm:grid-cols-4 esm:gap-y-2 items-center w-full px-3 py-2 rounded-xl mb-1 border border-solid cursor-default' style={{ textDecoration: 'none' }}>
                <div className="grid grid-flow-col items-center gap-3 w-fit col-span-5 amd:col-span-4 esm:col-span-3">
                    <div className="w-12 h-12 rounded overflow-hidden">
                        <IKImage
                            key={details?.thumbnailPhoto}
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={details?.thumbnailPhoto}
                            className="size-full object-cover"
                            loading='lazy'
                            lqip={{
                                active: true,
                                quality: 20
                            }}
                            alt={`${details?.thumbnailPhoto} image`}
                        />
                    </div>
                    <div>
                        <h1 className='font-500 tracking-tight hrmd:text-sm amd:text-[0.8rem] text-start'>{trim(details?.classname, 30)}</h1>
                        <p className='text-sm font-400 text-slate-800 opacity-70 amd:text-xs text-justify'>
                            {format(details?.createdAt, 'MMMM dd, yyyy')}
                        </p>
                    </div>
                </div>
                <p className='text-[0.75rem] text-center col-span-3 ilg:hidden amd:text-sm'>
                    {details?.paymentDetails?.paymentId}
                </p>
                <p className='text-center text-sm text-[#1b6540] amd:text-sm'>
                    #{details?.paidPrice.toLocaleString()}
                </p>
                <p className='text-center amd:text-sm esm:col-span-3 esm:text-start xsm:text-xs'>
                    <span className='hidden esm:inline-block text-sm xsm:text-xs'>Payment Type: &nbsp;</span>
                    [{details?.paymentDetails?.payment_method_type}]
                </p>
                <p className='text-center text-[#1b6540] text-sm amd:text-xs xsm:text-xs'>
                    <span className='hidden esm:inline-block text-sm font-bold xsm:text-xs'>Status: &nbsp;</span>
                    {details?.paymentDetails?.payment_status}
                </p>
                <p className='text-center text-sm text-[#1b6540] amd:hidden amd:text-sm'>
                    #{details?.shipping_options[0].shipping_amount.toFixed(2)}
                </p>
                {screenWidth <= 1199 && <div className='col-span-full'>
                    <AccordionContent className='flex gap-3 pt-4 pb-3 amd:justify-between esm:flex-col esm:items-start esm:gap-0 esm:pt-2'>
                        <p className='hidden ilg:block text-start'>
                            <span className='esm:inline-block text-sm amd:text-xs font-bold'>Payment ID: &nbsp;</span>
                            <span className='amd:text-xs'>{details?.paymentDetails?.paymentId}</span>
                        </p>
                        <p className='hidden amd:block text-start'>
                            <span className='esm:inline-block text-sm amd:text-xs font-bold'>Shipping A.: &nbsp;</span>
                            <span className='text-[#1b6540] amd:text-xs'>#{details?.shipping_options[0].shipping_amount.toFixed(2)}</span>
                        </p>
                    </AccordionContent>
                </div>
                }
            </AccordionTrigger>
        </AccordionItem>
    )
}

export default EnrolledDetails