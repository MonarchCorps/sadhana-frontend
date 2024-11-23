/* eslint-disable react/prop-types */
function Loading({ isLoading, text = '', bgColor }) {
    return (
        isLoading && (
            <div className={`fixed top-0 left-0 w-full h-full overflow-hidden z-[1000] grid place-items-center ${bgColor ? `bg-[${bgColor}]` : 'bg-[#ffffff80]'}`}>
                <div className='spinner'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {
                    text && (
                        <p className='mt-24'>{text}</p>
                    )
                }
            </div>
        )
    )
}

export default Loading