/* eslint-disable react/prop-types */
import { GiCrossMark } from "react-icons/gi"

function NoteOpen({ noteOpen, user, setNoteOpen, gender }) {
    return (
        noteOpen && user?.roles?.Instructor && !user?.roles?.Admin && (
            <div className='bg-white shadow absolute bottom-10 left-0 z-[100] px-3 py-1 border border-solid border-red-700'>
                <span className='float-right cursor-pointer' title='close content' onClick={() => setNoteOpen(false)}>
                    <GiCrossMark />
                </span>
                <span className='text-sm'><strong>Note:</strong> <span className='text-red-500 font-sans'>If you make {gender === 'female' ? 'her' : 'him'} an admin,  {gender === 'female' ? 'she' : 'he'} will lose all {gender === 'female' ? 'her' : 'his'} uploaded courses</span></span>
            </div>)
    )
}

export default NoteOpen