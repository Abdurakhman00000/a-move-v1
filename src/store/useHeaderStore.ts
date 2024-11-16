import { create } from "zustand";

interface IHeaderStore {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    closeMenu: () => void;
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
    closeMenu: () => set({ isOpen: false }), 
}))