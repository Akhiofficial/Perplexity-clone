import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages } from "../slices/chat.slice";
import { useDispatch, useSelector } from "react-redux";

export const useChat = () => {
    const dispatch = useDispatch()
    const currentChatId = useSelector(state => state.chat.currentChatId)

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))
        try {
            // Use the passed chatId OR the current one from state
            const targetChatId = chatId || currentChatId
            const data = await sendMessage({ message, chatId: targetChatId })
            const { chat, aiMessage, userMessage } = data

            // Logic: If there was no previous chatId, it's a new chat
            if (!targetChatId) {
                dispatch(createNewChat({
                    chatId: chat._id,
                    title: chat.title,
                }))
                dispatch(setCurrentChatId(chat._id))
            }

            // Always add the messages to the store
            dispatch(addNewMessage({
                chatId: chat._id,
                content: message,
                role: "user",
            }))

            dispatch(addNewMessage({
                chatId: chat._id,
                content: aiMessage.content,
                role: aiMessage.role,
                sources: aiMessage.sources, // Include sources
            }))
        } catch (err) {
            dispatch(setError(err.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        try {
            const data = await getChats()
            const { chats } = data
            dispatch(setChats(chats.reduce((acc, chat) => {
                acc[chat._id] = {
                    id: chat._id,
                    title: chat.title,
                    messages: [], // messages will load when chat is opened
                    lastUpdated: chat.updatedAt,
                }
                return acc
            }, {})))
        } catch (err) {
            dispatch(setError(err.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleOpenChat(chatId) {
        if (!chatId) {
            dispatch(setCurrentChatId(null))
            return
        }

        dispatch(setCurrentChatId(chatId))
        dispatch(setLoading(true))
        try {
            const data = await getMessages(chatId)
            const { messages } = data
            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
                sources: msg.sources, // Include sources
            }))
            // Clear and set messages
            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        } catch (err) {
            dispatch(setError(err.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleDeleteChat(chatId) {
        dispatch(setLoading(true))
        try {
            await deleteChat(chatId)
            dispatch(removeChat(chatId))
            if (currentChatId === chatId) {
                dispatch(setCurrentChatId(null))
            }
        } catch (err) {
            dispatch(setError(err.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat
    }
}