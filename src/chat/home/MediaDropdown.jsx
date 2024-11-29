/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { ImageIcon, Plus, Video } from 'lucide-react'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'

import ImageKit from "imagekit-javascript"
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from '@/hooks/useAuth'

function MediaDropdown({ conversationId }) {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const imageKit = new ImageKit({
        publicKey: import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY,
        urlEndpoint: import.meta.env.VITE_IMAGE_KIT_ENDPOINT,
    })

    const videoRef = useRef(null);
    const imageRef = useRef(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [preview, setPreview] = useState(null)

    const handleChange = (e) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedMedia(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleSendMessage = useMutation({
        mutationFn: async ({ media, type }) => {
            if (!media) return;

            const { data } = await axiosPrivate.get('/upload');
            const { token, signature, expire } = data;

            const result = await imageKit.upload({
                file: media,
                fileName: media.name,
                token,
                signature,
                expire,
            });

            await axiosPrivate.post(
                `/message/${auth?._id}`,
                {
                    content: result?.url,
                    conversation: conversationId,
                    messageType: type,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchConversations', auth?._id] });
            setPreview(null);
            setSelectedMedia(null);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Error sending message');
        },
    })

    return (
        <>
            <input
                type="file"
                ref={videoRef}
                name="video"
                accept="video/*"
                onChange={(e) => handleChange(e)}
                hidden
                multiple={false}
            />
            <input
                type="file"
                ref={imageRef}
                name="image"
                accept="image/*"
                onChange={(e) => handleChange(e)}
                hidden
                multiple={false}
            />

            {selectedMedia && (
                <MediaDialog
                    isOpen={!!selectedMedia}
                    onClose={() => {
                        setPreview(null);
                        setSelectedMedia(null);
                    }}
                    isLoading={handleSendMessage.isPending}
                    preview={preview}
                    selectedMedia={selectedMedia}
                    handleSendMessage={handleSendMessage}
                />
            )}

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Plus className="text-gray-600 dark:text-gray-400" />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => imageRef.current?.click()}>
                        <ImageIcon size={18} className="mr-1" /> Photo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => videoRef.current?.click()}>
                        <Video size={20} className="mr-1" />
                        Video
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default MediaDropdown
const MediaDialog = ({ isOpen, onClose, isLoading, preview, selectedMedia, handleSendMessage }) => {
    const isVideo = selectedMedia?.type?.startsWith('video');

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen && !isLoading) onClose();
            }}
        >
            <DialogTitle className="hidden">Preview Media</DialogTitle>
            <DialogContent className="bg-[#005c4b]">
                <DialogDescription>
                    {isVideo ? (
                        <ReactPlayer url={preview} controls width="100%" />
                    ) : (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    )}
                </DialogDescription>
                <Button
                    className="w-full"
                    disabled={isLoading}
                    onClick={() =>
                        handleSendMessage.mutate({
                            media: selectedMedia,
                            type: isVideo ? 'video' : 'image',
                        })
                    }
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </Button>
            </DialogContent>
        </Dialog>
    );
}