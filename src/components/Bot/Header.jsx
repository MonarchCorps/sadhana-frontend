/* eslint-disable react/prop-types */
import logo from '../../assets/images/logo.png'
import { FaTrash } from 'react-icons/fa6'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Fragment, useState } from 'react'
import { DeleteCancelButton, DeleteConfirmButton, DeleteModal } from '../Modals/DeleteModal'

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
                <DeleteModal>
                    <p>
                        Are you sure you want to delete all your chats?
                    </p>
                    <div className='mt-3 w-full text-center flex gap-4 justify-center'>
                        <DeleteCancelButton
                            onClick={() => {
                                setIsModalOpen(false)
                            }}
                        />
                        <DeleteConfirmButton
                            onClick={() => {
                                handleDeleteBotChat.mutate();
                                setIsModalOpen(false)
                            }}
                        />
                    </div>
                </DeleteModal>
            )}
        </Fragment>

    )
}

export default Header