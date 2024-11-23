/* eslint-disable react/prop-types */
import useAuth from '../../../../hooks/useAuth'
import { FaTrashAlt, FaUserAlt } from 'react-icons/fa'
import { LuListFilter } from 'react-icons/lu'
import { useState, useEffect, useRef } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import useHideScroll from '../../../../hooks/useHideScroll'
import Filter from './Filter'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useHandleClickOutside from '../../../../hooks/useHandleClickOutside'
import { FaBook } from 'react-icons/fa6'

function UsersManagementHeading({ data: datas, dataToDelete, setDataToDelete, deleteData, setFilteredData, management, title, desc }) {

    const { auth } = useAuth();
    const [searchItem, setSearchItem] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const dropDownRef = useRef(null);

    const [gender, setGender] = useState('Gender');
    const [roles, setRoles] = useState('Roles');

    useHandleClickOutside(isOpen, setIsOpen, dropDownRef);

    useHideScroll(isModalOpen)

    const handleInputChange = (e) => {
        e.preventDefault();
        const searchTerm = e.target.value
        setSearchItem(searchTerm);
        const filteredItems = datas?.filter(data =>

            data?.username.toLowerCase().includes(searchTerm.toLowerCase().trim())
            || data?.email?.toLowerCase().includes(searchTerm.toLowerCase().trim())
            || data?.address?.toLowerCase().includes(searchTerm.toLowerCase().trim())
            || (data.dateRegistered && format(data?.dateRegistered, 'MMM, dd yyyy').toLowerCase().includes(searchTerm.toLowerCase().trim()))
            || (data.roles && (Object.entries(data?.roles)
                .filter(([, value]) => value != null) // filter out nullish values
                .map(([key]) => key)).toString().toLowerCase().includes(searchTerm.toLowerCase().trim()))
        )

        setFilteredData(filteredItems);
    }

    useEffect(() => {
        if (searchItem.length === 0) {
            setFilteredData(datas)
        }
    }, [searchItem]);

    const handleSelect = (date) => {
        let filtered = datas.filter((data) => {
            let dateRegisteredDate = new Date(data["dateRegistered"]);
            let dateAppliedDate = new Date(data["dateApplied"]);
            let dateLastActive = new Date(data["lastActive"]);
            return (
                (dateRegisteredDate >= date.selection.startDate && dateRegisteredDate <= date.selection.endDate)
                || (dateAppliedDate >= date.selection.startDate && dateAppliedDate <= date.selection.endDate)
                || (dateLastActive >= date.selection.startDate && dateLastActive <= date.selection.endDate)
            );
        });
        setFilteredData(filtered);
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
    }

    useEffect(() => {
        let filtered = datas?.filter((data) => {
            return data?.gender === gender
        });
        const value = gender === 'gender' ? datas : filtered
        setFilteredData(value)
    }, [gender])

    const selectionRange = {
        startDate,
        endDate,
        key: 'selection',
    }

    const resetDateRange = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setFilteredData(datas)
    };

    useEffect(() => {
        let filtered = datas?.filter(data => {
            if (data && data?.roles) {
                return (Object.entries(data?.roles)
                    .filter(([, value]) => value != null) // filter out nullish values
                    .map(([key]) => key)).toString().toLowerCase().includes(roles.toLowerCase().trim())
            }
        })
        const value = roles === 'roles' ? datas : filtered
        setFilteredData(value)
    }, [roles])

    return (
        <>
            <h1 className='text-[2rem] mb-4 font-500 font-sans'>
                Hi <span className='text-[#27554a] font-cuba'>{auth?.username ?? 'User'}</span> Welcome to your dashboard
            </h1>
            <h1 className='text-[1.67rem] mb-4 font-500 font-sans inline-flex items-center'>
                <span className='mr-5'>
                    {management}
                </span>
                {
                    (
                        (management.split(' ')[0]).toLowerCase() === 'user'
                            ||
                            (management.split(' ')[0]).toLowerCase() === 'users' ? (
                            <span className='text-base'><FaUserAlt /></span>
                        ) : (
                            <span className='text-base'><FaBook /></span>
                        )
                    )
                }
            </h1>
            <p>{desc}</p>
            <div className='mt-10 mb-5 mr-5 flex justify-between'>
                <h1 className='text-[1.59rem] font-500 '>
                    <span>{title} {management.split(' ')[0]}</span>
                    &nbsp;
                    <span className='opacity-65'>{datas?.length}</span>
                </h1>
                <div className='grid grid-flow-col items-center gap-7 relative'>
                    <div className='w-96'>
                        <label htmlFor="search" className='left-[-9999px] absolute'>Search</label>
                        <div className='relative h-11'>
                            <span className='absolute text-[#8b8888] text-[1.2rem] top-[0.58rem] left-3 font-300'>
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                            <input
                                type="text"
                                placeholder='Search'
                                className=' pl-9 pr-4 py-1 size-full rounded-md border border-solid border-[#8b8888] outline-none font-400 text-[#292323] placeholder:font-arial placeholder:text-[0.95rem] placeholder:tracking-wide'
                                onChange={handleInputChange}
                                value={searchItem}
                            />
                            <div className='z-50 relative 4'>

                            </div>
                        </div>
                    </div>
                    {
                        dataToDelete && dataToDelete.length > 0 ? (
                            <button
                                id='openButton'
                                type='button'
                                className='flex items-center text-[0.9rem] border border-solid border-current px-6 py-[0.78rem] rounded-xl text-[#efefef] font-sans font-700 hover:border-current hover:bg-transparent bg-red-600 hover:text-red-600'
                                onClick={() => {
                                    dataToDelete && dataToDelete.length > 0 && setIsModalOpen(true);
                                }}
                            >
                                <span className='mr-3'> <FaTrashAlt /> </span>
                                <span>Delete </span>
                            </button>
                        ) : (
                            <button type='button' id='openButton' className='flex items-center text-[0.9rem] border border-solid border-current px-6 py-[0.78rem] rounded-xl text-[#efefef] font-sans font-700 hover:border-current hover:bg-transparent bg-[#0a0808] hover:text-[#0a0808]' onClick={() => {
                                setIsOpen(!isOpen)
                            }}>
                                <span className='mr-3' id='openButton'> <LuListFilter /> </span>
                                <span id='openButton'>Filter</span>
                            </button>
                        )
                    }

                    <Filter isOpen={isOpen} handleInputChange={handleInputChange} searchItem={searchItem} handleSelect={handleSelect} selectionRange={selectionRange} gender={gender} setGender={setGender} roles={roles} setRoles={setRoles} setSearchItem={setSearchItem} dropDownRef={dropDownRef} resetDateRange={resetDateRange} />
                    {isModalOpen && (
                        <div className="fixed top-0 left-0 bottom-0 right-0 w-full overflow-hidden flex items-center justify-center bg-black bg-opacity-50 z-[2000]">
                            <div className="bg-white p-5 rounded">
                                <p>
                                    {`Are you sure you want to delete ${dataToDelete.length} ${dataToDelete.length > 1 ? `${(management.split(' ')[0]).toLowerCase()}s` : `${(management.split(' ')[0]).toLowerCase()}`}`}
                                </p>
                                <div className="mt-4 flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setDataToDelete([])
                                            setIsModalOpen(false)
                                        }}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteData.mutate();
                                            setIsModalOpen(false)
                                        }}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UsersManagementHeading