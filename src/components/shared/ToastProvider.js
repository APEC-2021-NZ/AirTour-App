import React, { useEffect, useState } from 'react'
import { IonToast, useIonToast } from '@ionic/react'

const ToastContext = React.createContext()

const ToastProvider = ({ children }) => {
    const [present, dismiss] = useIonToast()
    const [toast, setToast] = useState(null)

    const contextValue = {
        // See: https://ionicframework.com/docs/api/toast#properties for options
        showToast: (options) =>
            present({
                duration: 3000,
                ...options,
            }),
    }
    console.log(toast)
    return (
        <ToastContext.Provider value={contextValue}>
            {children}
        </ToastContext.Provider>
    )
}

export { ToastContext }
export default ToastProvider
