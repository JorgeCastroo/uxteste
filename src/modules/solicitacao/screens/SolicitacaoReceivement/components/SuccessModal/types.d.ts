import React from "react"

export interface SuccessModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    redirect: () => void
}