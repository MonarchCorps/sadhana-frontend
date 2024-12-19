import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { IKImage } from 'imagekitio-react'

import Header from './partials/Header/Header'
import Footer from './partials/Footer/Footer'
import Subscribe from './Subscribe/Subscribe'

import { useNavigate } from 'react-router-dom'
import useScrollTop from '../hooks/useScrollTop'
import CustomizedProgressBars from './Loaders/Loading4'

import usePathAfterSlash from '../hooks/usePathAfterSlash'
import { FaTrash } from 'react-icons/fa6'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Loading from './Loaders/Loading'

import { UserAndInstructor, UserOnly } from '../utils/rolePermission'

function CustomPhoto() {

    const [limit, setLimit] = useState(10)
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient()

    const navigate = useNavigate();
    const { scrollTop } = useScrollTop()

    const [loadedImages, setLoadedImages] = useState([]);

    const { data: allPhotos, isLoading = true } = useQuery({
        queryKey: ['allCustomPhotos', { limit }],
        queryFn: () =>
            axiosPrivate.get(`/custom-photo/${limit}`).then((res) => res?.data),
        enabled: limit > 0,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const userAndInstructor = UserAndInstructor()
    const userOnly = UserOnly()
    const pathAfterSlash = usePathAfterSlash()

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1
    }

    const handleRedirectAddClass = (fileName) => {
        scrollTop()
        navigate(`/dashboard/instructor-cp/add-class?photoId=${fileName}`)
    }

    const handleRedirectApplication = (fileName) => {
        scrollTop()
        navigate(`/dashboard/student-cp/apply-instructor?photoId=${fileName}`)
    }

    useEffect(() => {
        if (allPhotos?.photos) {
            setLoadedImages((prev) => {
                const existingIds = prev.map((img) => img._id);
                const newPhotos = allPhotos.photos.filter((img) => !existingIds.includes(img._id));
                return [...prev, ...newPhotos];
            });
        }
    }, [allPhotos]);

    const deletePhoto = useMutation({
        mutationFn: (id) => {
            return axiosPrivate.delete('/custom-photo', {
                data: {
                    photoId: id
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCustomPhotos'] })
            toast.success('Deleted successfully')
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to delete';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    return (
        <>
            <Loading isLoading={deletePhoto.isPending} />
            {pathAfterSlash === 'custom-photo' && (
                <Header />
            )}
            <div className={`${pathAfterSlash === 'custom-photo' ? 'pt-28 pb-20 px-10' : 'pt-14'}`}>
                {pathAfterSlash === 'manage' && !isLoading && loadedImages?.length > 0 && (
                    <h1 className='text-[1.59rem] font-500 mb-6'>
                        <span>Photo</span>
                        &nbsp;
                        <span className='opacity-65'>{loadedImages?.length}</span>
                    </h1>
                )}
                {
                    loadedImages && loadedImages?.length > 0 ? (
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex -ml-[1.875rem] w-auto"
                            columnClassName="pl-[1.875rem]"
                        >
                            {
                                loadedImages.map(photo => {
                                    const fileName = photo?.customPhoto.split("/")[4].split("?")[0]
                                    return (
                                        <figure key={photo?._id} className='relative overflow-hidden'>
                                            <HoverCard
                                                openDelay={0}
                                                closeDelay={0}
                                                style={{
                                                    position: 'absolute',
                                                    background: 'red'
                                                }}
                                            >
                                                <HoverCardTrigger >
                                                    <IKImage
                                                        key={photo?.customPhoto}
                                                        urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                                                        path={fileName}
                                                        className='w-full h-auto mb-[1.875rem] bg-clip-padding break-inside-avoid rounded-md'
                                                        loading='lazy'
                                                    />
                                                </HoverCardTrigger>
                                                <HoverCardContent
                                                    align="center"
                                                    side="bottom"
                                                    sideOffset={-80}
                                                    avoidCollisions={true}
                                                    className="bg-transparent border-none p-0"
                                                >
                                                    {
                                                        <div className='size-full flex justify-center'>
                                                            {
                                                                pathAfterSlash === 'view' && (
                                                                    <button
                                                                        className="flex gap-1 items-center border border-solid border-red-600 bg-slate-50 rounded-xl transition-all px-3 py-2 text-red-500 hover:border-current hover:bg-red-500 hover:text-slate-50"
                                                                        onClick={() => {
                                                                            deletePhoto.mutate(photo?._id)
                                                                        }}>
                                                                        Delete Photo
                                                                        <FaTrash />
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    }
                                                    <div className='w-full justify-center grid grid-flow-col items-end gap-3 absolute bottom-0 left-0 right-0'>
                                                        {userAndInstructor && pathAfterSlash === 'custom-photo' && (
                                                            <div className='bg-[#ffffff6a] border border-solid border-slate-900 p-2 rounded-lg text-sm font-500 cursor-pointer whitespace-nowrap' onClick={() => handleRedirectAddClass(fileName)}>
                                                                <span>
                                                                    Use for a course
                                                                </span>
                                                            </div>
                                                        )}
                                                        {userOnly && pathAfterSlash === 'custom-photo' && (
                                                            <div className='bg-[#ffffff6a] border border-solid border-slate-900 p-2 rounded-lg text-sm font-500 whitespace-nowrap cursor-pointer' onClick={() => handleRedirectApplication(fileName)}>
                                                                <span>
                                                                    Use for application
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </figure>
                                    )
                                })
                            }
                        </Masonry>
                    )
                        : !isLoading && (
                            <p className='w-full text-center '>No photos available at the moment! Check back later or reload page!</p>
                        )}
                {
                    !isLoading && loadedImages?.length > 0 && (limit < allPhotos?.count) ? (
                        <div className='w-full text-center mt-10'>
                            <button
                                className='text-sm px-6 py-3 text-[#e5759a] rounded-full bg-slate-50 shadow-inner border-[#e5779a] border-solid border-2'
                                onClick={
                                    () => {
                                        setLimit(prev => prev + 10)
                                    }
                                }
                            >
                                Load more
                            </button>
                        </div>
                    ) : isLoading && (
                        <div className='w-full grid place-items-center mt-10'>
                            <button
                                disabled
                                className='text-sm w-fit flex items-center gap-3 px-6 py-2 text-[#e5759a] rounded-full bg-slate-50 shadow-inner border-[#e5779a] border-solid border-2'
                            >
                                Loading
                                <CustomizedProgressBars />
                            </button>
                        </div>
                    )}
            </div >
            {pathAfterSlash === 'custom-photo' && (
                <>
                    <Subscribe />
                    <Footer />
                </>
            )
            }
        </>
    )
}

export default CustomPhoto