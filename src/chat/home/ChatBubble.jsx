/* eslint-disable react/prop-types */
import useAuth from '@/hooks/useAuth'
import { useConversationStore } from '../store/chatStore'
import ChatBubbleAvatar from './ChatBubbleAvatar'
import DateIndicator from './DateIndicator'
import { Ban, CheckCheck } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import ChatAvatarAction from './ChatAvatarAction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'

const ChatBubble = ({ message, previousMessage, lastIdx, endRef }) => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const date = new Date(message?.createdAt)
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const time = `${hour}:${minute}`

    const { selectedConversation, setSelectedConversation } = useConversationStore()
    const isMember = selectedConversation?.participants?.includes(message?.sender?._id) || false
    const isGroup = selectedConversation?.isGroup
    const fromMe = message?.sender?._id === auth?._id
    const bgClass = fromMe ? 'bg-[#d9fdd3]' : 'bg-[#1f2b32] text-[#dddbdb]'

    const checkPreviousSender = previousMessage?.sender?._id !== message?.sender?._id
    const [open, setOpen] = useState(false)

    const renderMessageContent = () => {
        switch (message.messageType) {
            case 'text':
                return <TextMessage message={message} time={time} fromMe={fromMe} />
            case 'image':
                return <ImageMessage message={message} handleClick={() => setOpen(true)} time={time} fromMe={fromMe} />
            case 'video':
                return <VideoMessage message={message} time={time} fromMe={fromMe} />
            default:
                return null
        }
    }

    const handleCreateConversation = useMutation({
        mutationFn: ({ userId }) => {
            return axiosPrivate.post(`/conversation/${auth?._id}`, {
                participants: [userId, auth?._id],
                isGroup: false,
            })
        },
        onSuccess: async (response) => {
            const createdConversationId = response.data
            queryClient.invalidateQueries({ queryKey: ["fetchConversations", auth?._id] })
            if (createdConversationId) {
                try {
                    const { data } = await axiosPrivate.get(`/conversation/${auth?._id}`);
                    const newConversation = data.find(conversation => conversation?._id === createdConversationId)
                    setSelectedConversation({ conversation: newConversation, type: 'chat' })
                } catch (error) {
                    console.error("Failed to fetch the new conversation:", error);
                }
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error('Network error')
        }
    })

    if (!fromMe) {
        return (
            <>
                <DateIndicator message={message} previousMessage={previousMessage} />
                <div className={`flex relative gap-1 w-2/3 cimd:w-4/5 ${lastIdx && 'mb-1'}`}>
                    {checkPreviousSender && <OtherMessageIndicator />}
                    <ChatBubbleAvatar isGroup={isGroup} isMember={isMember} message={message} previousMessage={previousMessage} />
                    <div className={`flex z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative group ${bgClass}`}>
                        {isGroup && checkPreviousSender && (<div>
                            <span className='text-xs block font-600 w-full' onClick={() => handleCreateConversation.mutate({ userId: message.sender?._id })}>{message.sender?.username}</span>
                        </div>
                        )}
                        {renderMessageContent()}
                        {isGroup && <ChatAvatarAction message={message} conversationId={selectedConversation?._id} handleCreateConversation={handleCreateConversation} />}
                        {open && <ImageDialog src={message?.content} open={open} onClose={() => setOpen(false)} />}
                    </div>
                </div>
                {lastIdx && <div ref={endRef}></div>}
                {isGroup &&
                    !isMember &&
                    !selectedConversation?.participants?.includes(message?.sender?._id) &&
                    message.isLastOccurrence && (
                        <div className="w-full flex items-center justify-center mt-10 mb-3">
                            <p
                                className="flex gap-1 bg-[#808080] text-white p-2 rounded-md"
                                style={{ fontStyle: "italic" }}
                            >
                                <Ban /> <span>{message?.sender?.username}</span>{" "}
                                <span>has been removed</span>
                            </p>
                        </div>
                    )}
            </>
        )
    }

    return (
        <>
            <DateIndicator message={message} previousMessage={previousMessage} />
            <div className={`flex relative gap-1 w-2/3 cimd:w-4/5 ml-auto ${lastIdx && 'mb-1'}`}>
                <SelfMessageIndicator />
                <div className={`flex z-20 max-w-fit px-2 pr-1 py-1 rounded-md shadow-md ml-auto relative ${bgClass}`}>
                    {renderMessageContent()}
                    {open && <ImageDialog src={message?.content} open={open} onClose={() => setOpen(false)} />}
                </div>
            </div>
            {lastIdx && <div ref={endRef}></div>}
        </>
    )
}

export default ChatBubble


const ImageDialog = ({ src, onClose, open }) => {
    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            <DialogContent className='min-w-[750px] bg-[#005c4b]'>
                <DialogTitle className='sr-only'>
                    Image preview
                </DialogTitle>
                <DialogDescription className='relative h-[450px] flex justify-center'>
                    <img src={src} className='rounded-lg object-contain' alt='image' />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

const VideoMessage = ({ message, time, fromMe }) => {

    const { screenWidth } = useGetScreenWidth()

    return (
        <div>
            <ReactPlayer url={message.content} width={screenWidth <= 350 ? '180px' : screenWidth <= 386 ? '200px' : '250px'} height={screenWidth <= 350 ? '160px' : screenWidth <= 386 ? '200px' : '250px'} controls={true} />
            <MessageTime time={time} fromMe={fromMe} message={message} />
        </div>
    );
}

const ImageMessage = ({ message, handleClick, time, fromMe }) => {
    return (
        <div className='w-[250px] h-[250px] my-1 relative block xsm:w-52 xsm:h-52'>
            <img
                src={message.content}
                className='cursor-pointer object-cover rounded size-full'
                alt='image'
                onClick={handleClick}
            />
            <MessageTime time={time} fromMe={fromMe} message={message} />
        </div>
    );
}

const MessageTime = ({ time, fromMe, message }) => {
    return (
        <p className={`text-[10px] self-end flex gap-1 items-center ${message?.messageType === 'video' || message?.messageType === 'image' ? 'absolute bg-slate-200 text-slate-800 p-1 rounded bottom-3 right-3 font-500 font-sans' : ''}`}>
            {time} {fromMe && <CheckCheck size={15} />}
        </p >
    );
}

const OtherMessageIndicator = () => (
    <div className='absolute bg-[#1f2b32] top-0 -left-[4px] w-3 h-3 rounded-bl-full' />
)

const SelfMessageIndicator = () => (
    <div className='absolute bg-[#d9fdd3] top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden' />
)


const Text = styled.p`
        font-size: 16px;
        line-height: 1.6;
        white-space: pre-wrap;
        overflow: hidden;
        max-height: ${({ expanded }) => (expanded ? "none" : "120px")};
        transition: max-height 0.3s ease;

        @media (max-width: 710px) {
            font-size: 14px;
        }

        @media (max-width: 354px) {
            font-size: 12px;
            leading: 1.3;
        }
    `;

const ToggleButton = styled.button`
        margin-top: 4px;
        color: #264028;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        text-align: center;

        &:hover {
            text-decoration: underline;
        }

        @media (min-width: 768px) {
            width: auto;
        }

    `;
const TextMessage = ({ message, time, fromMe }) => {
    const isLink = /^(ftp|http|https):\/\/[^ ']+$/.test(message.content); // Check if the content is a URL

    const [expanded, setExpanded] = useState(false);
    const [showToggleButton, setShowToggleButton] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            setShowToggleButton(textRef.current.scrollHeight > 120);
        }
    }, [message.content]);

    const toggleReadMore = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            {isLink ? (
                <a
                    href={message.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-2 text-sm font-light text-blue-400 underline"
                >
                    {message.content}
                </a>
            ) : (
                <>
                    <Text ref={textRef} expanded={expanded}>
                        {message.content}
                    </Text>
                    <div
                        className={`flex justify-between ${showToggleButton ? 'mt-3 mb-2 amd:mt-2 amd:mb-1' : 'mb-1 ml-8'
                            }`}
                    >
                        <div>
                            {showToggleButton && (
                                <ToggleButton onClick={toggleReadMore}>
                                    {expanded ? "Read Less" : "Read More"}
                                </ToggleButton>
                            )}
                        </div>
                        <MessageTime time={time} fromMe={fromMe} message={message} />
                    </div>
                </>
            )}
        </div>
    )
}