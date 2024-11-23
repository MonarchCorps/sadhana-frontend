/* eslint-disable react/prop-types */
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateRangePicker } from 'react-date-range'
import usePathAfterSlash from '../../../../hooks/usePathAfterSlash'


const Filter = ({ isOpen, handleInputChange, searchItem, handleSelect, selectionRange, gender, setGender, roles, setRoles, setSearchItem, dropDownRef, resetDateRange }) => {

    const pathAfterSlash = usePathAfterSlash();

    return (
        isOpen && (
            <div className="absolute right-0 top-16 bg-[#fff] shadow-shadow border border-solid border-[#33222219] rounded-md z-10 w-fit" ref={dropDownRef}>
                <p className='font-500 px-4 py-2 text-[0.93rem] border-b border-solid border-b-[#33222219] text-[#100f0f] mb-3'>Filter</p>
                <div>
                    <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                        <p className='font-500 text-[0.93rem] text-[#100f0f]'>Date range</p>
                        <button type="reset" className='outline-none border-none text-[#007d75] text-sm'>Reset</button>
                    </div>
                    <div className='flex flex-col gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2'>
                        <div className='flex justify-between'>
                            <p className='font-sans text-[0.89rem] text-[#151111]'>From: </p>
                            <p className='font-sans text-[0.89rem] text-[#151111]'>To: </p>
                        </div>
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={true}
                        />
                    </div>
                </div>
                {
                    pathAfterSlash === 'manage-users' && (
                        <>
                            <div>
                                <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                                    <p className='font-500 text-[0.93rem] text-[#100f0f]'>Gender</p>
                                    <button type="reset" className='outline-none border-none text-[#007d75] text-sm' onClick={() => {
                                        setGender('gender')
                                    }}>Reset</button>
                                </div>
                                <div className='flex gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2'>
                                    <select name="gender" id="gender" className='text-sm border border-b-2 border-solid border-[#7c7a7a] rounded-xl w-full p-2' onChange={(e) => setGender(e.target.value)} value={gender}>
                                        <option value="gender">Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="notSpecified">Not specified</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                                    <p className='font-500 text-[0.93rem] text-[#100f0f]'>Roles</p>
                                    <button type="reset" className='outline-none border-none text-[#007d75] text-sm' onClick={() => {
                                        setRoles('roles')
                                    }}>Reset</button>
                                </div>
                                <div className='flex gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2'>
                                    <select name="roles" id="roles" className='text-sm border border-b-2 border-solid border-[#7c7a7a] rounded-xl w-full p-2' onChange={(e) => setRoles(e.target.value)} value={roles}>
                                        <option value="roles">Roles</option>
                                        <option value="user">User</option>
                                        <option value="instructor">Instructor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )
                }
                <div>
                    <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                        <p className='font-500 text-[0.93rem] text-[#100f0f]'>Keyword Search</p>
                        <button type="reset" className='outline-none border-none text-[#007d75] text-sm' onClick={() => {
                            setSearchItem('')
                        }}>Reset</button>
                    </div>
                    <div className='flex gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2 relative'>
                        <span className='absolute text-[#8b8888] text-[1.2rem] top-[0.4rem] left-6 font-300'>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                            type="text"
                            placeholder='Search...'
                            className='text-sm border px-10 border-b-2 border-solid border-[#7c7a7a] rounded-lg w-full p-2'
                            onChange={handleInputChange}
                            value={searchItem}
                        />
                    </div>
                </div>
                <div>
                    <div className='text-[0.90rem] mb-2 px-3'>
                        <button type="reset" className='outline-none text-sm border border-solid border-[#acabab] px-3 py-2 rounded-md' onClick={() => {
                            setSearchItem('');
                            setRoles && setRoles('roles');
                            setRoles && setGender('gender');
                            resetDateRange();
                        }}>Reset all</button>
                    </div>
                </div>
            </div>
        )
    )
}

export default Filter