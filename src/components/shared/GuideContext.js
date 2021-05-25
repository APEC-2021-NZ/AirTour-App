import React, { createContext, useState } from 'react'

export const GuideContext = createContext()

const GuideProivider = ({ children }) => {
    const [guideID, setGuideID] = useState('')
    const [showGuide, setShowGuide] = useState(false)
    const [showCreateGuide, setShowCreateGuide] = useState(false)

    return (
        <GuideContext.Provider
            value={{
                showGuide,
                setShowGuide,
                guideID,
                setGuideID,
                showCreateGuide,
                setShowCreateGuide,
            }}
        >
            {children}
        </GuideContext.Provider>
    )
}

export default GuideProivider
