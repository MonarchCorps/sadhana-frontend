import { create } from 'zustand'

export const useConversationStore = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation })
}))