/* eslint-disable react/prop-types */
import logo from '../../assets/images/logo.png'
import { FaTrash } from 'react-icons/fa6'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Fragment, useState } from 'react'

function Header({ handleOpen, handleDeleteBotChat }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Fragment>
            <header className='fixed bg-[#fff] px-4 py-2 w-[26rem]'>
                <div className='flex items-center justify-between w-full h-fit'>
                    <div className='w-48 overflow-hidden'>
                        <img src={logo} alt='logo' className=' object-cover' />
                    </div>
                    <div className='h-full grid grid-flow-col gap-4 place-items-center'>
                        <button
                            className='w-fit text-red-600 text-xl'
                            onClick={() => setIsModalOpen(true)}
                        >
                            <FaTrash />
                        </button>
                        <button className='w-fit text-slate-400 opacity-70 text-xl' onClick={handleOpen}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
            </header>
            {isModalOpen && (
                <div className="fixed top-0 left-0 bottom-0 right-0 w-full overflow-hidden flex items-center justify-center bg-black bg-opacity-50 z-[2000]">
                    <div className="bg-white p-5 rounded">
                        <p>
                            Are you sure you want to delete all your chats?
                        </p>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false)
                                }}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleDeleteBotChat.mutate();
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
        </Fragment>

    )
}

export default Header