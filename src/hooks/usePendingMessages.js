import { useContext } from "react"
import PendingMessageContext from "../context/PendingMessageProvider"

const usePendingMessages = () => {
    return useContext(PendingMessageContext)
}

export default usePendingMessages
