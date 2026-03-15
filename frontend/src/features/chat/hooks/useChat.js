import { initializeSocketConnection } from "../service/chat.socket";

// custom hook to use socket connection
export const useChat = () => {
    return initializeSocketConnection();
}