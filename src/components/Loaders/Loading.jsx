/* eslint-disable react/prop-types */
import botLogo from '../../assets/images/9c7d37cd-ba05-4987-8a75-c5376ac4990d.png'

function Loading({ isLoading, text = '', bgColor }) {
    return (
        isLoading && (
            <div className={`fixed top-0 left-0 w-full h-full overflow-hidden z-[1000] grid place-items-center ${bgColor ? `bg-[${bgColor}]` : 'bg-[#ffffff80]'}`}>
                <img src={botLogo} />
                {/* <div className='spinner'>
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
                } */}
            </div>
        )
    )
}

export default Loading