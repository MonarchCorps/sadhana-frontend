import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import Loading from '../../../../../components/Loaders/Loading'
import useHideScroll from '../../../../../hooks/useHideScroll'
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function EditUser() {

    const { isLoading, data: allUsers } = useQuery({
        queryKey: ['allUsers'],
        queryFn: () =>
            axiosPrivate.get('/admin-cp/all-users').then((res) => {
                return res?.data
            }),
    })

    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient()

    const ikUploadRef = useRef(null)

    const [user, setUser] = useState({});

    const initialRoles = {
        User: user?.roles?.User || null,
        Instructor: user?.roles?.Instructor || null,
        Admin: user?.roles?.Admin || null,
    };

    const [img, setImg] = useState({
        isLoading: false,
        error: '',
        dbData: {},
    });

    const [roles, setRoles] = useState(initialRoles);

    useEffect(() => {
        const filteredUser = allUsers?.find(user => user._id === id);
        setUser(filteredUser)
    }, [allUsers, id])

    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        profileImage: null,
        email: '',
        dateRegistered: '',
        updatedAt: '',
        _id: '',
        gender: 'gender',
        phoneNumber: '',
        roles: initialRoles,
        address: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user?.username || '',
                profileImage: user?.profileImage || null,
                email: user?.email || '',
                dateRegistered: user?.dateRegistered || '',
                updatedAt: user?.updatedAt || '',
                _id: user?._id || '',
                gender: user?.gender || 'gender',
                phoneNumber: user?.phoneNumber || '',
                roles: user?.roles || {
                    User: null,
                    Instructor: null,
                    Admin: null
                },
                address: user.address || ''
            });

            setRoles({
                User: user?.roles?.User || null,
                Instructor: user?.roles?.Instructor || null,
                Admin: user?.roles?.Admin || null,
            });
        }
    }, [user])

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            roles: roles,
        }));
    }, [roles]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            profileImage: img.dbData?.filePath
        }))
    }, [img])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('address', formData.address);

        if (formData.profileImage) {
            formDataToSend.append('profileImage', formData.profileImage);
        }

        formDataToSend.append('roles', JSON.stringify({
            User: formData.roles.User,
            Instructor: formData.roles.Instructor,
            Admin: formData.roles.Admin
        }));

        editUser.mutate(formDataToSend)
    }

    const editUser = useMutation({
        mutationFn: (formDataToSend) => {
            return axiosPrivate.patch(`/admin-cp/edit-user/${user?._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allUsers"] })
            queryClient.invalidateQueries({ queryKey: ["homeAllCourses"] })
            toast.success('Updated successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Error updating user';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(isLoading || editUser.isPending)

    return (
        <>
            <Loading isLoading={isLoading || editUser.isPending} />
            <section className='imd:w-screen'>
                <div className='pt-14 px-3 pb-3 w-full h-full flex flex-col justify-center max-w-[38.8rem] amd:max-w-[34rem] esm:px-5 mx-auto'>
                    <div className='w-full text-start'>
                        <h1 className='text-[2rem] amd:text-2xl ixsm:text-xl mb-2 font-500 font-serif'>
                            Edit user profile <span className='text-[#27554a] font-roboto'>{user?.username}</span>
                        </h1>
                    </div>
                    <div className='w-full'>
                        <EditUserForm user={user} handleChange={handleChange} preview={preview} formData={formData} setRoles={setRoles} handleSubmit={handleSubmit} img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditUser