import React from 'react'

// the shape of the context value
type MessageContextType = {
    isVisible: boolean,
    setVisible: () => void,
    isVisibleClockIn: boolean,
    setVisibleClockIn: () => void
}

// state for the context
const messageContextState: MessageContextType = {
    isVisible: false,
    setVisible: () => { },
    isVisibleClockIn: false,
    setVisibleClockIn: () => { }
}

// Create and export the context with the default state
export const MessageContext = React.createContext(messageContextState)
