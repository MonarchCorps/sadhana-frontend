/* eslint-disable react/prop-types */
import { LuListFilter } from 'react-icons/lu'
import Filter from '../../Admin/Filter'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import useHandleClickOutside from '../../../../../hooks/useHandleClickOutside'
import { format } from 'date-fns'

function FilterSection({ data: datas, setFilteredData }) {
    const [searchItem, setSearchItem] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const dropDownRef = useRef(null);

    useHandleClickOutside(isOpen, setIsOpen, dropDownRef);

    const handleInputChange = (e) => {
        e.preventDefault();
        const searchTerm = e.target.value
        setSearchItem(searchTerm);

        const filteredItems = datas.filter(data => {
            return (
                data?.email?.toLowerCase().includes(searchTerm.toLowerCase().trim())
                // || data?.totalAmount?.includes(searchTerm.toLowerCase().trim())
                || data.paymentDetails?.paymentId.toLowerCase().includes(searchTerm.toLowerCase().trim())
                || data.paymentDetails?.payment_status.toLowerCase().includes(searchTerm.toLowerCase().trim())
                || data.paymentDetails?.payment_method_type.some(type => {
                    return type.toLowerCase().includes(searchTerm.toLowerCase().trim())
                })
                || data.shipping_options[0]?.shipping_rate.toLowerCase().includes(searchTerm.toLowerCase().trim())
                || data?.courseDetails.some(course => {
                    return (
                        course?.classname.toLowerCase().includes(searchTerm.toLowerCase().trim())
                        || course?.day.toLowerCase().includes(searchTerm.toLowerCase().trim())
                        || course?.description.toLowerCase().includes(searchTerm.toLowerCase().trim())
                        || course?.videoUrl.toLowerCase().includes(searchTerm.toLowerCase().trim())
                    )
                })

                || (data.createdAt && format(data?.createdAt, 'MMM, dd yyyy').toLowerCase().includes(searchTerm.toLowerCase().trim()))

            )
        })

        setFilteredData(filteredItems);
    }

    useEffect(() => {
        if (Number(searchItem.length) === 0) {
            setFilteredData(datas)
        }
    }, [searchItem, setFilteredData, datas]);

    const handleSelect = (date) => {
        let filtered = datas.map(data => { return data }).filter((data) => {
            let dateCreatedAt = new Date(data["createdAt"]);
            return (
                (dateCreatedAt >= date.selection.startDate && dateCreatedAt <= date.selection.endDate)
                || data.courseDetails.some(course => {
                    let dateCourseCreatedAt = new Date(course["createdAt"]);
                    let dateCourseUpdatedAt = new Date(course["updatedAt"]);
                    return (
                        (dateCourseUpdatedAt >= date.selection.startDate && dateCourseUpdatedAt <= date.selection.endDate)
                        || (dateCourseCreatedAt >= date.selection.startDate && dateCourseCreatedAt <= date.selection.endDate)
                    )
                })
            );
        });
        setFilteredData(filtered);
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
    }

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

    return (
        <div className='mt-10 mb-5 mr-5 flex justify-between'>
            <h1 className='text-[1.59rem] font-500 text-slate-50 font-san px-3'>
                Payments made
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
                    </div>
                </div>
                <button type='button' id='openButton' className='flex items-center text-[0.9rem] border border-solid border-current px-6 py-[0.78rem] rounded-xl text-[#efefef] font-sans font-700 hover:border-current hover:bg-slate-50 bg-[#0a0808] hover:text-[#0a0808]' onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    <span className='mr-3' id='openButton'> <LuListFilter /> </span>
                    <span id='openButton'>Filter</span>
                </button>
                <Filter isOpen={isOpen} handleInputChange={handleInputChange} searchItem={searchItem} handleSelect={handleSelect} selectionRange={selectionRange} setSearchItem={setSearchItem} dropDownRef={dropDownRef} resetDateRange={resetDateRange} />
            </div>
        </div>
    )
}

export default FilterSection