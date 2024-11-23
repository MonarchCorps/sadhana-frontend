import cardImage1 from '../../assets/images/meditation-2.png'
import cardImage2 from '../../assets/images/yoga-pose-1.png'
import cardImage3 from '../../assets/images/yoga.png'
import cardImage4 from '../../assets/images/pilates.png'
import cardImage5 from '../../assets/images/book.png'
import cardImage6 from '../../assets/images/meditation-1.png'
// import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { FaArrowRight } from 'react-icons/fa6'

function ServicesCard() {

    const cardsContent = [
        {
            id: 1,
            heading: 'Anxiety Relief',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage1,
            imageBg: '#927397',
            cardBg: '#FFF',
            linkColor: '#D6809C'
        },
        {
            id: 2,
            heading: 'Life Balancing',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage2,
            imageBg: '#FFF',
            cardBg: '#927397',
            color: '#FFF',
            linkColor: '#FFF'
        },
        {
            id: 3,
            heading: 'Reduce Stress',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage3,
            imageBg: '#927397',
            cardBg: '#FFF',
            linkColor: '#D6809C'
        },
        {
            id: 4,
            heading: 'Flexible Time',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage4,
            imageBg: '#927397',
            cardBg: '#FFF',
            linkColor: '#D6809C'
        },
        {
            id: 5,
            heading: 'Health Tips',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage5,
            imageBg: '#927397',
            cardBg: '#FFF',
            linkColor: '#D6809C'
        },
        {
            id: 6,
            heading: 'Life Consultation',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage6,
            imageBg: '#927397',
            cardBg: '#FFF',
            linkColor: '#D6809C'
        }
    ]

    return (
        <div className='grid grid-cols-3 gap-6 mt-9 p-1'>
            {
                cardsContent.map(content => {
                    return (
                        <div key={content.id} className='rounded-xl shadow-lg py-11 px-[1.9rem]' style={{ background: `${content.cardBg}` }}>
                            <div className='mb-4'>
                                <div className='w-14 h-14 rounded-full text-center grid place-items-center max-w-prose mx-auto p-2' style={{ background: `${content.imageBg}` }}>
                                    <img src={content.image} alt={`${content.heading} image`} className='w-9' />
                                </div>
                            </div>
                            <h1 className='text-3xl mb-3 font-500' style={{ color: `${content?.color || '#000'}` }}>{content.heading}</h1>
                            <p className='text-base mb-3' style={{ color: `${content?.color || '#000'}`, fontWeight: '300' }}>{content.text}</p>
                            <div className='w-full grid place-items-center'>
                                <div className='text-base relative w-fit cursor-pointer pb-1' style={{ color: `${content.linkColor}` }}>
                                    Learn more <FaArrowRight className='inline-block align-text-middle -mt-1' />
                                    <div className='absolute w-full h-[0.095rem] bottom-0' style={{ background: `${content.linkColor}` }}></div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default ServicesCard