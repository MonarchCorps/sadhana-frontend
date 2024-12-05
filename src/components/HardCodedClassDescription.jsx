import { Fragment } from 'react'

function HardCodedClassDescription() {
    return (
        <Fragment>
            <div className='mt-8'>
                <h1 className='font-500 text-xl mb-4 esm:text-base'>Course description</h1>
                <p className='text-base leading-[1.65] esm:text-sm/relaxed'>
                    This Yoga Training Course is designed to introduce you to the ancient practice of yoga and help you develop strength, flexibility, mindfulness, and balance.
                    <br /><br />
                    Whether you&apos;re a beginner looking to start your journey or an intermediate yogi looking to deepen your practice, this course offers a structured path to mastering the fundamentals of yoga, understanding your body, and finding inner peace through breath control, meditation, and physical postures.
                </p>
            </div>
            <div className='mt-8'>
                <div className='bg-[#f8f8f8] p-7 rounded-xl'>
                    <h1 className='font-500 text-xl mb-4'>What you will learn?</h1>
                    <ul className='grid grid-cols-2 himd:grid-cols-1 gap-4 place-items-center'>
                        <li className='esm:text-sm/relaxed'>
                            <p className='inline-block'>
                                <strong><span>1.</span> Basic Yoga Postures (Asanas):</strong> Learn the most common yoga poses, including standing, seated, and reclining postures.
                            </p>
                        </li>
                        <li className='esm:text-sm/relaxed'>
                            <p className='inline-block'>
                                <strong><span>2.</span> Breathing Techniques (Pranayama):</strong>  Discover different breathing techniques to calm the mind, increase focus, and enhance your physical performance.
                            </p>
                        </li>
                        <li className='esm:text-sm/relaxed'>
                            <p className='inline-block'>
                                <strong><span>3.</span> Mindfulness and Meditation: </strong>Explore mindfulness practices and meditation techniques to reduce stress, increase awareness, and foster a sense of inner peace.
                            </p>
                        </li>
                        <li className='esm:text-sm/relaxed'>
                            <p className='inline-block'>
                                <strong><span>4.</span> Alignment and Body Awareness:</strong>   Focus on body alignment in yoga poses to prevent injury and maximize the benefits of your practice.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='mt-8'>
                <h1 className='font-500 text-xl mb-4 esm:text-base'>Lesson plan</h1>
                <p className='text-base leading-[1.65] esm:text-sm/relaxed'>
                    By the end of this course, you will have a solid foundation in yoga, improved physical strength and flexibility, and a deeper understanding of how to incorporate mindfulness and breathing techniques into your daily life for stress reduction and mental clarity.

                    Let me know if you&apos;d like to adjust the content or add more details!
                </p>

            </div>
        </Fragment>
    )
}

export default HardCodedClassDescription