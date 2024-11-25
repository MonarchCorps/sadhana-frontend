import { Lock } from 'lucide-react'
import detectOS from '../utils/detectOs'
import { Button } from '@/components/ui/button';
import heroImg from '@/assets/chatImages/desktop-hero.png'

const ChatPlaceHolder = () => {
    const os = detectOS()
    return (
        <div className='w-3/4 bg-[#f0f2f5] flex flex-col items-center justify-center py-10'>
            <div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
                <img src={heroImg} alt='Hero' width={320} height={188} />
                <p className='text-3xl font-extralight mt-5 mb-2'>Download Sadhana for {os}</p>
                <p className='w-1/2 text-center text-sm text-muted-foreground'>
                    Make calls, share your screen and get a faster experience when you download the
                    <span>
                        {os}
                    </span>
                    app.
                </p>

                {
                    os === 'Windows' ? (
                        <Button className='rounded-full my-5 bg-[#00a884] hover:bg-[#00c795]'>
                            Get from Microsoft Store
                        </Button>
                    ) : os === 'Mac' || os === 'IOS' ? (
                        <Button className='rounded-full my-5 bg-[#00a884] hover:bg-[#00c795]'>
                            Get from App Store
                        </Button>
                    ) : (
                        <Button className='rounded-full my-5 bg-[#00a884] hover:bg-[#00c795]'>
                            Get from Store
                        </Button>
                    )
                }
            </div>
            <p className='w-1/2 mt-auto text-center text-xs text-muted-foreground flex items-center justify-center gap-1'>
                <Lock size={10} /> Your personal messages are end-to-end encrypted
            </p>
        </div>
    );
};
export default ChatPlaceHolder