import { createContext, useState } from "react"

const PendingMessageContext = createContext({})

export const PendingMessageProvider = ({ children }) => {
    const [pendingMessages, setPendingMessages] = useState({})
    return (
        <PendingMessageProvider.Provider value={{ pendingMessages, setPendingMessages }}>
            {children}
        </PendingMessageProvider.Provider>
    )
}

export default PendingMessageContext;