/* eslint-disable react/prop-types */
import Select from 'react-select'

import useAuth from '../../../../../hooks/useAuth'

import UploadImageKit from '../../../../../components/UploadImageKit/UploadImageKit'
import SubmitButton from '../../../../../components/SubmitButton/SubmitButton'

const AddClassForm = ({ preview, handleChange, formData, handleSubmit, handleTimeChange, dayArray, setDayArray, isLoading, img, setImg, setPreview, ikUploadRef }) => {

    const { auth } = useAuth();

    const handleDayChange = (selectedOptions) => {
        const allDaysOption = { value: 'All Days', label: 'All Days' };

        if (selectedOptions.some(option => option.value === 'All Days')) {
            setDayArray([allDaysOption.value]);
            return;
        }

        const allOtherDays = options
            .filter(option => option.value !== 'All Days')
            .map(option => option.value);

        const selectedValues = selectedOptions.map(option => option.value);

        if (allOtherDays.every(day => selectedValues.includes(day))) {
            setDayArray([allDaysOption.value]);
            return;
        }

        setDayArray(selectedValues);
    };


    const options = [
        { value: 'All Days', label: 'All Days' },
        { value: 'Mon', label: 'Mon' },
        { value: 'Tue', label: 'Tue' },
        { value: 'Wed', label: 'Wed' },
        { value: 'Thur', label: 'Thur' },
        { value: 'Fri', label: 'Fri' },
        { value: 'Sat', label: 'Sat' },
        { value: 'Sun', label: 'Sun' },
    ];

    const valid = Object.values(formData).every(value => value !== '' && value !== undefined && value !== null)

    return (
        <>
            <form className="grid grid-cols-2 gap-3 mt-7 max-w-[41rem] mx-auto">
                <div className='col-span-2 mb-3'>
                    <UploadImageKit img={img} setImg={setImg} setPreview={setPreview} ikUploadRef={ikUploadRef} preview={preview} isLoading={isLoading} imgName='thumbnailPhoto' />
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="classname">Class Name</label>
                    <input
                        type="text"
                        name="classname"
                        id="classname"
                        autoComplete="off"
                        required
                        placeholder="Enter your class name"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                        onChange={handleChange}
                        value={formData.classname}
                        maxLength='100'
                        minLength='5'
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="videoUrl">Youtube Link</label>
                    <input
                        type="url"
                        name="videoUrl"
                        id="videoUrl"
                        autoComplete="off"
                        required
                        placeholder="Your course into video link"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                        onChange={handleChange}
                        value={formData.videoUrl}
                    />
                </div>

                <div className='aism:col-span-2'>
                    <p className='text-sm mb-2 font-500'>Day</p>
                    <Select
                        id="days"
                        value={options.filter(option => dayArray.includes(option.value))}
                        className='mt-1'
                        required
                        isMulti
                        options={options}
                        onChange={handleDayChange}
                        closeMenuOnSelect={false}
                    />
                </div>

                <div className='aism:col-span-2'>
                    <div className='flex justify-between mb-1'>
                        <p className='text-sm font-500'>Start Time</p>
                        <p className='text-sm font-500'>End Time</p>
                    </div>
                    <div className='flex gap-3'>
                        <input
                            type="time"
                            name="startTime"
                            id="startTime"
                            className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none'
                            required
                            onChange={handleTimeChange}
                            value={formData.time.startTime}
                        />
                        <input
                            type="time"
                            name="endTime"
                            id="endTime"
                            className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full outline-none'
                            required
                            onChange={handleTimeChange}
                            value={formData.time.endTime}
                        />
                    </div>
                </div>

                <div className='flex flex-col axsm:col-span-2 w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="instructorName">Instructor name</label>
                    <input
                        type="text"
                        name="instructorName"
                        id="instructorName"
                        readOnly
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full bg-[#d4e9fc82] outline-none cursor-default'
                        value={auth?.username}
                    />
                </div>

                <div className='flex flex-col axsm:col-span-2 w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="instructorEmail">Instructor email</label>
                    <input
                        type="email"
                        name="instructorEmail"
                        id="instructorEmail"
                        readOnly
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded w-full bg-[#d4e9fc82] outline-none cursor-default'
                        value={auth?.email}
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="totalSeats">Total Seats</label>
                    <input
                        type="number"
                        name="totalSeats"
                        id="totalSeats"
                        autoComplete="off"
                        required
                        placeholder="How many seats are available"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                        onChange={handleChange}
                        value={formData.totalSeats}
                        max={999}
                        min={1}
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <label className='text-sm mb-2 font-500' htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        autoComplete="off"
                        required
                        placeholder="How much does it costs?"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                        onChange={handleChange}
                        value={formData.price}
                    />
                </div>

                <div className="col-span-2 flex flex-col w-full">
                    <label className='text-sm mb-2 font-500' htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        autoComplete="off"
                        required
                        placeholder="Description about your course"
                        className='border-[1px] border-solid border-[#aeacac] p-3 rounded placeholder:text-sm resize-none h-48'
                        onChange={handleChange}
                        value={formData.description}
                    />
                </div>
                <SubmitButton divStyle="col-span-2 w-full mt-3" valid={valid} action={handleSubmit}>
                    Submit
                </SubmitButton>
            </form >
        </>
    )


}


export default AddClassForm