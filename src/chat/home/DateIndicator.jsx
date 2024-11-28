/* eslint-disable react/prop-types */
import { isSameDay, getRelativeDateTime } from '../lib/utils'

const DateIndicator = ({ message, previousMessage }) => {
    return (
        <>
            {!previousMessage || !isSameDay(previousMessage?.createdAt, message?.createdAt) ? (
                <div className='flex justify-center'>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mb-2 p-1 z-50 rounded-md bg-white'>
                        {getRelativeDateTime(message, previousMessage)}
                    </p>
                </div>
            ) : null}
        </>
    )
}

export default DateIndicator