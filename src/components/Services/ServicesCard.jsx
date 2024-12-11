import { FaArrowRight } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import cardImage1 from '../../assets/images/meditation-2.png'
import cardImage2 from '../../assets/images/yoga-pose-1.png'
import cardImage3 from '../../assets/images/yoga.png'
import cardImage4 from '../../assets/images/pilates.png'
import cardImage5 from '../../assets/images/book.png'
import cardImage6 from '../../assets/images/meditation-1.png'

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
            linkColor: '#D6809C',
            dur: 0.65
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
            linkColor: '#FFF',
            dur: 0.85
        },
        {
            id: 3,
            heading: 'Reduce Stress',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage3,
            imageBg: '#927397',
            cardBg: '#FFF',
            linkColor: '#D6809C',
            dur: 0.95
        },
        {
            id: 4,
            heading: 'Flexible Time',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage4,
            imageBg: '#927397',
            cardBg: '#FFF',
            linkColor: '#D6809C',
            dur: 0.89
        },
        {
            id: 5,
            heading: 'Health Tips',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage5,
            imageBg: '#927397',
            cardBg: '#FFF',
            linkColor: '#D6809C',
            dur: 0.72
        },
        {
            id: 6,
            heading: 'Life Consultation',
            text: 'Volutpat euismod erat fermentum bibendum est metus. Ultrices dictumst rhoncus dictum magnis.',
            link: '',
            image: cardImage6,
            imageBg: '#927397',
            cardBg: '#FFF',
            linkColor: '#D6809C',
            dur: 0.82
        }
    ]

    return (
        <div className='grid grid-cols-3 hrmd:grid-cols-2 sm:grid-cols-1 gap-6 mt-9 p-1'>
            {
                cardsContent.map(content => {
                    return (
                        <motion.div
                            initial={{ y: "17vh", opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: content.dur, ease: "easeOut" }}
                            viewport={{ once: true }}
                            key={content.id}
                            className='rounded-xl shadow-lg py-11 px-[1.9rem] z-30'
                            style={{ background: `${content.cardBg}` }}>
                            <div className='mb-4'>
                                <div className='w-14 h-14 rounded-full text-center grid place-items-center max-w-prose mx-auto p-2' style={{ background: `${content.imageBg}` }}>
                                    <img src={content.image} alt={`${content.heading} image`} className='w-9' />
                                </div>
                            </div>
                            <h1 className='text-3xl mb-3 font-500 lg:text-2xl' style={{ color: `${content?.color || '#000'}` }}>{content.heading}</h1>
                            <p className='text-base mb-3 lg:text-sm' style={{ color: `${content?.color || '#000'}`, fontWeight: '300' }}>{content.text}</p>
                            <div className='w-full grid place-items-center'>
                                <div className='text-base relative w-fit cursor-pointer pb-1 lg:text-sm' style={{ color: `${content.linkColor}` }}>
                                    Learn more <FaArrowRight className='inline-block align-text-middle -mt-1' />
                                    <div className='absolute w-full h-[0.095rem] bottom-0' style={{ background: `${content.linkColor}` }}></div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })
            }
        </div>

    )
}

export default ServicesCard