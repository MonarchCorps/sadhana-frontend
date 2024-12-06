import { create } from 'zustand'

export const useConversationStore = create((set) => ({
    selectedConversation: null,
    stateType: null,
    setSelectedConversation: ({ conversation, type }) => set({ selectedConversation: conversation, stateType: type })
}))