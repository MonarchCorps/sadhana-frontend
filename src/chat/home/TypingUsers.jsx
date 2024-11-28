/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import useSocket from '@/hooks/useSocket';
import useFetchUsername from '@/hooks/useFetchUsername';
import useAuth from '@/hooks/useAuth';

const TypingUsers = ({ showName, setShowName, currentConversationId }) => {
    const { auth } = useAuth();
    const { connectSocket } = useSocket();
    const socket = connectSocket(auth?._id);

    const [typingUsers, setTypingUsers] = useState([]);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const typingTimers = useRef({});

    const { fetchName } = useFetchUsername();

    const userNames = typingUsers.map(({ userId }) => fetchName(userId));

    useEffect(() => {
        if (!socket) return;

        const handleActivity = ({ userId, conversationId, status }) => {
            console.log(conversationId !== currentConversationId)
            if (conversationId !== currentConversationId) return;

            if (status === 'typing') {
                setTypingUsers((prev) => {
                    const userExists = prev.some((user) => user.userId === userId);
                    if (!userExists) return [...prev, { userId, conversationId }];
                    return prev;
                });

                if (typingTimers.current[userId]) {
                    clearTimeout(typingTimers.current[userId]);
                }
                typingTimers.current[userId] = setTimeout(() => {
                    setTypingUsers((prev) =>
                        prev.filter((user) => user.userId !== userId)
                    );
                    delete typingTimers.current[userId];
                }, 3000);
            } else if (status === 'stopped') {
                setTypingUsers((prev) =>
                    prev.filter((user) => user.userId !== userId)
                );
                if (typingTimers.current[userId]) {
                    clearTimeout(typingTimers.current[userId]);
                    delete typingTimers.current[userId];
                }
            }
        };

        socket.on('activity', handleActivity);

        return () => {
            socket.off('activity', handleActivity);
            Object.values(typingTimers.current).forEach(clearTimeout);
            typingTimers.current = {};
        };
    }, [socket, currentConversationId]);

    useEffect(() => {
        if (typingUsers.length === 0) {
            setShowName('');
            return;
        }

        const interval = setInterval(() => {
            setShowName(userNames[currentUserIndex] || '')
            setCurrentUserIndex((prevIndex) => (prevIndex + 1) % typingUsers.length);
        }, 3000)

        return () => clearInterval(interval);
    }, [typingUsers, currentUserIndex, userNames, setShowName]);

    return (
        <div>
            {showName && (
                <span className='text-sm text-slate-500'>{showName} is typing...</span>
            )}
        </div>
    );
};

export default TypingUsers