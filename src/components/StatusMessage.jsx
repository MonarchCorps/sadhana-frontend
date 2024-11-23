/* eslint-disable react/prop-types */
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa'

function StatusMessage({ isLoading = false, msgs }) {
    return (

        !isLoading && msgs.length > 0 && (
            <div className='flex flex-col fixed top-3 right-5 z-[1000] gap-3'>
                {
                    msgs.map(msg => {
                        return (
                            <div key={msg.id}>
                                <div className="shadow-lg relative rounded-xl w-fit bg-slate-50 overflow-hidden">
                                    <div className={`px-5 py-4 text-sm tracking-wide flex items-center ${msg.type === 'success' ? 'text-green-900' : 'text-red-700'}`}>
                                        <span>
                                            {msg.type === 'success' ? <FaCheckCircle /> : <FaInfoCircle />}
                                        </span>
                                        <span className='ml-2 break-all'>{msg.msg}! {msg.type === 'success' ? '😊' : '😢'}</span>
                                    </div>
                                    <div className={`absolute w-[4px] h-full left-0 top-0 bottom-0 ${msg.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )

    )
}

export default StatusMessage