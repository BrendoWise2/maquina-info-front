"use client"
import { createContext, ReactNode, useState } from "react";

type MachineContextData = {
    isOpen: boolean;
    onRequestOpen: () => void;
    onRequestClose: () => void;
}

type MachineProvideProps = {
    children: ReactNode
}

export const MachineContext = createContext({} as MachineContextData)

export function MachineProvider({ children }: MachineProvideProps) {

    const [isOpen, setIsOpen] = useState(false);

    function onRequestOpen() {
        setIsOpen(true);
    }

    function onRequestClose() {
        setIsOpen(false);
    }

    return (
        <MachineContext.Provider
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose
            }}
        >
            {children}
        </MachineContext.Provider>
    )

}