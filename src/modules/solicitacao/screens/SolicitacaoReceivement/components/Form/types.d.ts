import React from "react"

export interface FormProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    motivo: string
    setMotivo: React.Dispatch<React.SetStateAction<string>>
    onSubmit: () => void
}