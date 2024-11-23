import trainerImage1 from '../../assets/images/Team-5.jpg'
import trainerImage2 from '../../assets/images/Team-7.jpg'
import trainerImage3 from '../../assets/images/Team-8.jpg'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'

function TrainersList() {

    const trainers = [
        {
            id: 1,
            name: 'Sharon Novotny',
            image: trainerImage1,
            fbLink: '',
            igLink: '',
            liLink: ''
        },
        {
            id: 2,
            name: 'Kara Whitman',
            image: trainerImage2,
            fbLink: '',
            igLink: '',
            liLink: ''
        },
        {
            id: 3,
            name: 'Emily Mayes',
            image: trainerImage3,
            fbLink: '',
            igLink: '',
            liLink: ''
        }
    ]

    return (
        <>
            {
                trainers.map(trainer => {
                    return (
                        <div key={trainer.id} className='shadow-shadow rounded-xl overflow-hidden'>
                            <div className='relative'>
                                <img src={trainer.image} alt={`${trainer.name}-yoga trainer`} className='h-[20rem] w-full object-cover' />
                                <div className='absolute flex bottom-6 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-4'>
                                    <span className='text-[#e5759a] bg-slate-50 w-10 h-10 rounded-full grid place-items-center text-sm cursor-pointer'>
                                        <FaFacebookF />
                                    </span>
                                    <span className='text-[#e5759a] bg-slate-50 w-10 h-10 rounded-full grid place-items-center text-sm cursor-pointer'>
                                        <FaInstagram />
                                    </span>
                                    <span className='text-[#e5759a] bg-slate-50 w-10 h-10 rounded-full grid place-items-center text-sm cursor-pointer'>
                                        <FaLinkedinIn />
                                    </span>
                                </div>
                            </div>
                            <div className='p-6 text-center'>
                                <h1 className='text-[#927397] text-xl tracking-wide mb-1'>{trainer.name}</h1>
                                <p className='text-[#3a3939] text-[15px]'>Yoga Trainer</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default TrainersList