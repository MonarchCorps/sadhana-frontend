import useOnlineUsers from "@/hooks/useOnlineUsers"
import { IKImage } from "imagekitio-react"

/* eslint-disable react/prop-types */
function ChatBubbleAvatar({ isGroup, isMember, message, previousMessage }) {

    const { onlineUsers } = useOnlineUsers()
    const checkPrevMsg = previousMessage?.sender?._id !== message?.sender?._id

    if (!isGroup) return
    return (
        <div className={`relative mr-1 ${checkPrevMsg ? null : 'ml-9'}`}> {/** if prevMsgId !== msgId return null; else apply this class */}
            {checkPrevMsg && onlineUsers.includes(message?.sender?._id) && isMember && <div className='absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-solid border-[#020817] z-50' />}
            {
                checkPrevMsg ? (
                    <IKImage
                        key={message?.sender?.profileImage}
                        urlEndpoint={"https://ik.imagekit.io/4sbkuudrb"}
                        path={message?.sender?.profileImage}
                        className='w-9 h-9 object-cover rounded-full'
                        loading='lazy'
                        lqip={{
                            active: true,
                            quality: 20
                        }}
                        alt={`${message?.sender?.username} image`}
                    />
                ) : (
                    null
                )
            }
        </div>
    )
}

export default ChatBubbleAvatar